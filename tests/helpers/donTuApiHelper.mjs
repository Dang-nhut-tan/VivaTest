// tests/helpers/donTuApiHelper.mjs
// Helper API cho Đơn từ và Xác nhận công: truy vấn DB PostgREST và hỗ trợ phê duyệt

import { getAdminToken, provisionTestEmployee } from './profileApiHelper.mjs';

const BASE_URL = process.env.BASE_URL || 'https://workdemo.vivacorp.vn';
const API_BASE = `${BASE_URL}/api`;
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoid2ViX2Fub24iLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaXNzIjoidml2YWJvLWJhY2tvZmZpY2UiLCJpYXQiOjE3ODcwNjM1MzksImV4cCI6MTgxODU5OTUzOX0.08H6BsQclEjCP6Yec4Uq4H9jgskRGDGJp0LJHEXF0So';

export { getAdminToken, provisionTestEmployee };

/**
 * Lấy danh sách Đơn xác nhận công của nhân viên
 * @param {string} empId
 * @param {string} adminToken
 * @returns {Promise<Array>}
 */
export async function getAttendanceConfirmRequests(empId, adminToken) {
  const res = await fetch(`${API_BASE}/attendance_confirm_request?employee_id=eq.${empId}&order=created_at.desc`, {
    headers: {
      'apikey': API_KEY,
      'Authorization': `Bearer ${adminToken}`
    }
  });
  if (!res.ok) throw new Error(`Fetch attendance_confirm_request failed: ${res.status} ${await res.text()}`);
  return res.json();
}

/**
 * Lấy danh sách Đơn xin nghỉ phép của nhân viên
 * @param {string} empId
 * @param {string} adminToken
 * @returns {Promise<Array>}
 */
export async function getLeaveRequests(empId, adminToken) {
  const res = await fetch(`${API_BASE}/leave_request?employee_id=eq.${empId}&order=submitted_at.desc`, {
    headers: {
      'apikey': API_KEY,
      'Authorization': `Bearer ${adminToken}`
    }
  });
  if (!res.ok) throw new Error(`Fetch leave_request failed: ${res.status} ${await res.text()}`);
  return res.json();
}

/**
 * Quản lý / HR phê duyệt Đơn xác nhận công
 * @param {string} requestId
 * @param {string} adminToken
 * @param {'approved'|'rejected'} status
 * @param {string} [rejectReason]
 */
export async function decideAttendanceConfirmRequest(requestId, adminToken, status = 'approved', rejectReason = null) {
  const body = {
    status,
    ...(rejectReason ? { reject_reason: rejectReason, rejected_by: 'manager' } : { reject_reason: null, rejected_by: null })
  };

  const res = await fetch(`${API_BASE}/attendance_confirm_request?id=eq.${requestId}`, {
    method: 'PATCH',
    headers: {
      'apikey': API_KEY,
      'Authorization': `Bearer ${adminToken}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) throw new Error(`Approve attendance_confirm_request failed: ${res.status} ${await res.text()}`);
  return res.json();
}

/**
 * Quản lý / HR phê duyệt Đơn xin nghỉ phép
 * @param {string} requestId
 * @param {string} adminToken
 * @param {'approved'|'rejected'} status
 * @param {string} [reason]
 */
export async function decideLeaveRequest(requestId, adminToken, status = 'approved', reason = 'Duyệt tự động qua POM') {
  if (status === 'approved') {
    // Thử qua RPC duyet_don_nghi để áp dụng đúng trừ phép kho
    try {
      const rpcRes = await fetch(`${API_BASE}/rpc/duyet_don_nghi`, {
        method: 'POST',
        headers: {
          'apikey': API_KEY,
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ p_id: requestId, p_ly_do: reason })
      });
      if (rpcRes.ok) {
        return rpcRes.json();
      }
    } catch {
      // Bỏ qua nếu RPC gặp lỗi mạng/môi trường, rơi xuống fallback PATCH bên dưới
    }
  }

  // Fallback hoặc nhánh từ chối: PATCH trực tiếp
  const body = {
    status,
    ...(status === 'rejected' ? { reject_reason: reason, rejected_by: 'manager' } : {})
  };

  const res = await fetch(`${API_BASE}/leave_request?id=eq.${requestId}`, {
    method: 'PATCH',
    headers: {
      'apikey': API_KEY,
      'Authorization': `Bearer ${adminToken}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) throw new Error(`Decide leave_request failed: ${res.status} ${await res.text()}`);
  return res.json();
}
