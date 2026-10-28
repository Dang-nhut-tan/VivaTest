// tests/helpers/authExtApiHelper.mjs
// Helper API cho tính năng Đăng nhập bằng Số điện thoại & Quên mật khẩu

import { getAdminToken, provisionTestEmployee } from './profileApiHelper.mjs';

const BASE_URL = process.env.BASE_URL || 'https://workdemo.vivacorp.vn';
const API_BASE = `${BASE_URL}/api`;
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoid2ViX2Fub24iLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaXNzIjoidml2YWJvLWJhY2tvZmZpY2UiLCJpYXQiOjE3ODcwNjM1MzksImV4cCI6MTgxODU5OTUzOX0.08H6BsQclEjCP6Yec4Uq4H9jgskRGDGJp0LJHEXF0So';

export { getAdminToken, provisionTestEmployee };

/**
 * Đăng nhập qua GoTrue API bằng Số điện thoại (chuẩn hóa 84xxxxxxxxx)
 * @param {string} phone
 * @param {string} password
 * @returns {Promise<object>}
 */
export async function loginWithPhoneApi(phone, password) {
  const normalizedPhone = phone.startsWith('0') ? `84${phone.slice(1)}` : phone.replace(/^\+/, '');
  const res = await fetch(`${API_BASE}/auth/token?grant_type=password`, {
    method: 'POST',
    headers: {
      'apikey': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ phone: normalizedPhone, password })
  });
  if (!res.ok) throw new Error(`Phone login failed: ${res.status} ${await res.text()}`);
  return res.json();
}

/**
 * Gửi yêu cầu đặt lại mật khẩu qua RPC xin_dat_lai_mat_khau
 * @param {string} identifier (mã nhân viên hoặc số điện thoại)
 * @returns {Promise<object>}
 */
export async function requestPasswordResetApi(identifier) {
  const res = await fetch(`${API_BASE}/rpc/xin_dat_lai_mat_khau`, {
    method: 'POST',
    headers: {
      'apikey': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ p_dinh_danh: identifier })
  });
  if (!res.ok) throw new Error(`Reset password request failed: ${res.status} ${await res.text()}`);
  return res.json();
}
