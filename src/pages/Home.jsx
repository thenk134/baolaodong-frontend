import React from 'react';
import NewsCard from "../components/NewsCard";
import { NEWS_DATA } from "../data";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* CỘT CHÍNH: Danh sách tin tức */}
        <div className="md:w-2/3">
          <div className="flex items-center justify-between border-b-2 border-red-700 pb-2 mb-8">
            <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">
              Tin mới nhất
            </h2>
            <span className="text-sm text-gray-500 font-medium">Cập nhật: 2026</span>
          </div>
          
          {/* Duyệt qua mảng dữ liệu để hiển thị các NewsCard */}
          <div className="flex flex-col">
            {NEWS_DATA.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </div>

        {/* CỘT PHỤ (SIDEBAR): Các thông tin bổ sung */}
        <div className="md:w-1/3">
          <div className="sticky top-24 space-y-6">
            
            {/* Box Tiện ích */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 text-red-700 border-b pb-2">
                Tiện ích lao động
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer p-2 hover:bg-blue-50 rounded-lg transition">
                  <span className="mr-2">🧮</span> Tính lương Gross - Net
                </li>
                <li className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer p-2 hover:bg-blue-50 rounded-lg transition">
                  <span className="mr-2">🏥</span> Tra cứu bảo hiểm xã hội
                </li>
                <li className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer p-2 hover:bg-blue-50 rounded-lg transition">
                  <span className="mr-2">⚖️</span> Tư vấn luật trực tuyến
                </li>
              </ul>
            </div>

            {/* Box Quảng cáo/Thông báo */}
            <div className="bg-red-700 text-white p-6 rounded-xl shadow-lg">
              <h3 className="font-bold text-lg mb-2">Đường dây nóng</h3>
              <p className="text-sm opacity-90 mb-4">Hỗ trợ khẩn cấp về quyền lợi người lao động</p>
              <div className="text-2xl font-black">1900 1234</div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}