#!/usr/bin/env python3
"""
scripts/select_daily_module.py
Quản lý lịch trình điều tra và sinh testcase hàng ngày: 1 ngày 1 phân hệ, không trùng lặp.
"""

import sys
import os
import json
from datetime import datetime, timezone
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

BASE_DIR = Path(__file__).resolve().parent.parent
SCHEDULE_FILE = BASE_DIR / ".qa-module-schedule.json"

DEFAULT_MODULES = [
    {"slug": "cham-cong", "name": "Chấm Công Lộ Trình Đi Quán", "tier": "L", "priority": "P0"},
    {"slug": "duyet-don", "name": "Duyệt Đơn & Phân Cấp Phê Duyệt", "tier": "L", "priority": "P0"},
    {"slug": "bang-cong", "name": "Xem Bảng Công", "tier": "L", "priority": "P0"},
    {"slug": "nghi-viec", "name": "Cho Nhân Sự Nghỉ Việc Admin", "tier": "L", "priority": "P0"},
    {"slug": "dang-nhap", "name": "Đăng Nhập PWA & App", "tier": "L", "priority": "P0"},
    {"slug": "quen-mat-khau", "name": "Quên Mật Khẩu PWA", "tier": "M", "priority": "P1"},
    {"slug": "don-tu", "name": "Đơn Từ & Phê Duyệt", "tier": "M", "priority": "P1"},
    {"slug": "xep-ca-quan-ly", "name": "Giao Diện Quản Lý Xếp Ca", "tier": "M", "priority": "P1"},
    {"slug": "dang-ky-ca", "name": "Đăng Ký & Duyệt Ca Làm Quán", "tier": "M", "priority": "P1"},
    {"slug": "dao-tao", "name": "Quản Lý Đào Tạo & Lịch Học", "tier": "M", "priority": "P1"},
    {"slug": "store-dept", "name": "Cửa Hàng & Phòng Ban Admin", "tier": "M", "priority": "P1"},
    {"slug": "cong-ty", "name": "Quản Lý Công Ty Admin", "tier": "M", "priority": "P1"},
    {"slug": "profile-update", "name": "Cập Nhật Hồ Sơ & Ngân Hàng", "tier": "M", "priority": "P1"},
    {"slug": "auth-phone-forgot", "name": "Xác Thực SĐT & Quên Mật Khẩu", "tier": "M", "priority": "P1"},
    {"slug": "phan-anh", "name": "Kênh Phản Ánh & Khiếu Nại", "tier": "S", "priority": "P2"},
    {"slug": "dang-tin", "name": "Đăng Tin Nội Bộ Admin", "tier": "S", "priority": "P2"},
    {"slug": "phong-hop", "name": "Đặt Phòng Họp & Bất Cập", "tier": "S", "priority": "P2"}
]

def load_schedule():
    if not SCHEDULE_FILE.exists():
        data = {
            "queue": DEFAULT_MODULES,
            "completed": [],
            "history": []
        }
        save_schedule(data)
        return data
    with open(SCHEDULE_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_schedule(data):
    with open(SCHEDULE_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def get_next():
    data = load_schedule()
    completed_slugs = set(data.get("completed", []))
    for item in data.get("queue", []):
        if item["slug"] not in completed_slugs:
            print(json.dumps(item, ensure_ascii=False))
            return item
    print(json.dumps({"status": "ALL_COMPLETED", "message": "Đã hoàn thành toàn bộ 17 phân hệ trong chu kỳ."}, ensure_ascii=False))
    return None

def mark_done(slug):
    data = load_schedule()
    if slug not in data["completed"]:
        data["completed"].append(slug)
    data["history"].append({
        "slug": slug,
        "completed_at": datetime.now(timezone.utc).isoformat()
    })
    save_schedule(data)
    print(f"OK: Đã ghi nhận phân hệ '{slug}' hoàn thành hôm nay. Danh sách đã xong ({len(data['completed'])}/17).")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python select_daily_module.py [--get-next | --mark-done <slug> | --status]")
        sys.exit(1)
    
    cmd = sys.argv[1]
    if cmd == "--get-next":
        get_next()
    elif cmd == "--mark-done" and len(sys.argv) > 2:
        mark_done(sys.argv[2])
    elif cmd == "--status":
        d = load_schedule()
        print(f"Completed ({len(d['completed'])}/17): {', '.join(d['completed'])}")
    else:
        print(f"Unknown command: {cmd}")
        sys.exit(1)
