// tests/helpers/bangCongApiHelper.mjs
// Helper hỗ trợ chuẩn bị dữ liệu kiểm thử Bảng công qua Backend API

const BASE_URL = process.env.BASE_URL || 'https://workdemo.vivacorp.vn';
const API_BASE = `${BASE_URL}/api`;
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoid2ViX2Fub24iLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaXNzIjoidml2YWJvLWJhY2tvZmZpY2UiLCJpYXQiOjE3ODcwNjM1MzksImV4cCI6MTgxODU5OTUzOX0.08H6BsQclEjCP6Yec4Uq4H9jgskRGDGJp0LJHEXF0So';

const DEFAULT_USER_PASS = 'Password@123';

import { getAdminToken } from './profileApiHelper.mjs';
export { getAdminToken };

/**
 * Đảm bảo tài khoản nhân viên kiểm thử bảng công tồn tại và có dữ liệu ngày công
 * @param {string} adminToken
 * @returns {Promise<{ employeeCode: string, password: string, fullName: string, empId: string }>}
 */
export async function ensureTimesheetEmployee(adminToken) {
  const adminHeaders = {
    'apikey': API_KEY,
    'Authorization': `Bearer ${adminToken}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };

  // 1. Kiểm tra tài khoản NVVP01AUTO
  const empRes = await fetch(`${API_BASE}/employee?employee_code=eq.NVVP01AUTO`, {
    headers: adminHeaders
  });
  const emps = await empRes.json();

  let empId = null;
  let fullName = 'Nguyễn Văn Phòng Auto';

  if (Array.isArray(emps) && emps.length > 0) {
    empId = emps[0].id;
    fullName = emps[0].full_name;
  } else {
    // Tạo mới nếu chưa có
    const createRes = await fetch(`${API_BASE}/employee`, {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify({
        employee_code: 'NVVP01AUTO',
        full_name: fullName,
        work_group: 'BACKOFFICE',
        personal_phone: '0901234501',
        email: 'nvvp01@vivacorp.vn',
        status: 'active',
        job_title: 'Chuyên viên IT',
        joined_on: '2026-10-16',
        gps_exempt: true,
        photo_exempt: true
      })
    });
    const created = await createRes.json();
    empId = created[0].id;

    // Kích hoạt auth
    await fetch(`${API_BASE}/auth/users`, {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify({
        email: 'nvvp01@vivacorp.vn',
        password: DEFAULT_USER_PASS,
        email_confirm: true,
        user_metadata: { employee_id: empId, employee_code: 'NVVP01AUTO' }
      })
    });
  }

  // 2. Kiểm tra bản ghi timesheet_day ngày 2026-10-16
  const tsRes = await fetch(`${API_BASE}/timesheet_day?employee_id=eq.${empId}&work_date=eq.2026-10-16`, {
    headers: adminHeaders
  });
  const tsDays = await tsRes.json();

  if (!Array.isArray(tsDays) || tsDays.length === 0) {
    await fetch(`${API_BASE}/timesheet_day`, {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify({
        employee_id: empId,
        work_date: '2026-10-16',
        assigned_shift_code: 'VP-HC1',
        punch_in_at: '2026-10-16T08:00:00+07:00',
        punch_out_at: '2026-10-16T17:30:00+07:00',
        attendance_code: 'X',
        standard_hours: 8,
        actual_hours: 8,
        normal_hours: 8,
        status: 'APPROVED'
      })
    });
  }

  return {
    employeeCode: 'NVVP01AUTO',
    password: DEFAULT_USER_PASS,
    fullName,
    empId
  };
}
