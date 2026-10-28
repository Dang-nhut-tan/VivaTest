// tests/helpers/phanAnhApiHelper.mjs
// Helper API hỗ trợ kiểm thử Kênh phản ánh (Ẩn danh & Đứng tên)

import { getAdminToken, provisionTestEmployee } from './profileApiHelper.mjs';

const BASE_URL = process.env.BASE_URL || 'https://workdemo.vivacorp.vn';
const API_BASE = `${BASE_URL}/api`;
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoid2ViX2Fub24iLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaXNzIjoidml2YWJvLWJhY2tvZmZpY2UiLCJpYXQiOjE3ODcwNjM1MzksImV4cCI6MTgxODU5OTUzOX0.08H6BsQclEjCP6Yec4Uq4H9jgskRGDGJp0LJHEXF0So';

export { getAdminToken, provisionTestEmployee };

/**
 * Đăng nhập nhân viên bằng mã NV / email để lấy JWT Access Token
 * @param {string} employeeCode
 * @param {string} password
 * @returns {Promise<string>}
 */
export async function getEmployeeToken(employeeCode, password) {
  const email = `${employeeCode.toLowerCase()}@manv.viva.local`;
  const res = await fetch(`${API_BASE}/auth/token?grant_type=password`, {
    method: 'POST',
    headers: {
      'apikey': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error(`Employee login failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.access_token;
}

/**
 * Lấy danh sách phản ánh đứng tên của chính nhân viên gọi qua RPC phan_anh_cua_toi
 * @param {string} userToken
 * @returns {Promise<Array>}
 */
export async function getOwnGrievances(userToken) {
  const res = await fetch(`${API_BASE}/rpc/phan_anh_cua_toi`, {
    method: 'POST',
    headers: {
      'apikey': userToken,
      'Authorization': `Bearer ${userToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  if (!res.ok) throw new Error(`Fetch own grievances failed: ${res.status} ${await res.text()}`);
  return res.json();
}

/**
 * Tra cứu phản ánh bằng mã vé qua RPC tra_cuu_phan_anh
 * @param {string} ticketCode
 * @param {string} userToken
 * @returns {Promise<object>}
 */
export async function lookupGrievanceByCode(ticketCode, userToken) {
  const res = await fetch(`${API_BASE}/rpc/tra_cuu_phan_anh`, {
    method: 'POST',
    headers: {
      'apikey': userToken,
      'Authorization': `Bearer ${userToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ p_ma_ve: ticketCode })
  });
  if (!res.ok) throw new Error(`Lookup grievance failed: ${res.status} ${await res.text()}`);
  return res.json();
}
