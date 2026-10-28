// tests/helpers/profileApiHelper.mjs
// Helper tích hợp API Backend cho kịch bản kiểm thử: Cấp tài khoản nhân viên, đối soát DB và HR duyệt

const BASE_URL = process.env.BASE_URL || 'https://workdemo.vivacorp.vn';
const API_BASE = `${BASE_URL}/api`;
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoid2ViX2Fub24iLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaXNzIjoidml2YWJvLWJhY2tvZmZpY2UiLCJpYXQiOjE3ODcwNjM1MzksImV4cCI6MTgxODU5OTUzOX0.08H6BsQclEjCP6Yec4Uq4H9jgskRGDGJp0LJHEXF0So';

const ADMIN_EMAIL = 'dung.demo@vi-du.test';
const ADMIN_PASS = 'Nqshndc@123';
const DEFAULT_USER_PASS = 'Password@123';

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { setTimeout } from 'node:timers/promises';

const CACHE_FILE = path.join(os.tmpdir(), 'vivaoffice-admin-token.json');

/**
 * Đăng nhập HR Admin để lấy JWT Access Token (hỗ trợ Cache tránh 429 rate limit)
 * @returns {Promise<string>}
 */
export async function getAdminToken() {
  // 1. Kiểm tra cache còn hạn (tối đa 40 phút)
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const cached = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
      if (cached?.token && cached?.expiresAt && Date.now() < cached.expiresAt) {
        return cached.token;
      }
    }
  } catch (err) {
    void err;
  }

  // 2. Gọi API đăng nhập, tự động thử lại nếu dính 429
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(`${API_BASE}/auth/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'apikey': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASS })
    });

    if (res.status === 429 && attempt < 4) {
      await setTimeout(attempt * 4000);
      continue;
    }

    if (!res.ok) throw new Error(`Admin login failed: ${res.status} ${await res.text()}`);
    const data = await res.json();

    try {
      fs.writeFileSync(CACHE_FILE, JSON.stringify({
        token: data.access_token,
        expiresAt: Date.now() + 40 * 60 * 1000
      }), 'utf8');
    } catch (err) {
      void err;
    }

    return data.access_token;
  }
}

/**
 * Tạo nhân viên kiểm thử mới và kích hoạt tài khoản
 * @param {string} adminToken
 * @param {object} empParams
 * @returns {Promise<object>}
 */
export async function provisionTestEmployee(adminToken, { code, fullName, phone, email, password = DEFAULT_USER_PASS }) {
  const adminHeaders = {
    'apikey': API_KEY,
    'Authorization': `Bearer ${adminToken}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };

  const todayIso = new Date().toISOString().slice(0, 10);

  // 1. Thêm nhân viên vào employee table
  const empRes = await fetch(`${API_BASE}/employee`, {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({
      employee_code: code,
      full_name: fullName,
      work_group: 'BACKOFFICE',
      personal_phone: phone,
      email: email,
      status: 'active',
      job_title: 'Chuyên viên Nhân sự',
      company_id: '6fef1277-e489-4000-9161-351fbd06111a',
      store_or_dept: 'Phòng Hành chính Nhân sự',
      joined_on: todayIso,
      created_at: new Date().toISOString()
    })
  });
  if (!empRes.ok) throw new Error(`Create employee failed: ${empRes.status} ${await empRes.text()}`);
  const empData = await empRes.json();
  const empId = empData[0].id;

  // 2. Gán nơi làm việc (phòng ban văn phòng)
  await fetch(`${API_BASE}/employment_assignment`, {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({
      employee_id: empId,
      department_id: 'b149b56f-23ae-4e9d-9cf3-f54497a61bb8',
      store_id: null,
      office_store_id: null,
      is_primary: true,
      valid_from: todayIso
    })
  });

  // 3. Cấp mã kích hoạt qua RPC tao_tai_khoan_nhan_su
  const accRes = await fetch(`${API_BASE}/rpc/tao_tai_khoan_nhan_su`, {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({
      p_employee_id: empId,
      p_role: 'EMPLOYEE'
    })
  });
  if (!accRes.ok) throw new Error(`tao_tai_khoan_nhan_su failed: ${accRes.status} ${await accRes.text()}`);
  const accData = await accRes.json();
  const activationCode = accData.code;

  // 4. Kích hoạt tài khoản qua RPC activate_account
  const actRes = await fetch(`${API_BASE}/rpc/activate_account`, {
    method: 'POST',
    headers: {
      'apikey': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      p_identity: `${code.toLowerCase()}@manv.viva.local`,
      p_code: activationCode,
      p_new_password: password
    })
  });
  if (!actRes.ok) throw new Error(`activate_account failed: ${actRes.status} ${await actRes.text()}`);

  return { empId, code, fullName, phone, email, password };
}

/**
 * Lấy danh sách yêu cầu cập nhật hồ sơ pending của nhân viên
 * @param {string} empId
 * @param {string} adminToken
 * @returns {Promise<Array>}
 */
export async function getPendingProfileRequests(empId, adminToken) {
  const res = await fetch(`${API_BASE}/profile_update_request?employee_id=eq.${empId}&status=eq.pending`, {
    headers: {
      'apikey': API_KEY,
      'Authorization': `Bearer ${adminToken}`
    }
  });
  if (!res.ok) throw new Error(`Fetch profile requests failed: ${res.status}`);
  return res.json();
}

/**
 * HR Admin duyệt một yêu cầu cập nhật hồ sơ
 * @param {string} requestId
 * @param {string} adminToken
 * @param {'approve'|'reject'} action
 * @param {string} reason
 */
export async function decideProfileUpdateRequest(requestId, adminToken, action = 'approve', reason = 'Approved via POM Automation') {
  const res = await fetch(`${API_BASE}/rpc/duyet_yeu_cau_sua_ho_so`, {
    method: 'POST',
    headers: {
      'apikey': API_KEY,
      'Authorization': `Bearer ${adminToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      p_request_id: requestId,
      p_action: action,
      p_reason: reason
    })
  });
  if (!res.ok) throw new Error(`RPC duyet_yeu_cau_sua_ho_so failed: ${res.status} ${await res.text()}`);
  return res.json();
}
