import React from 'react';

import { Link } from 'react-router-dom';

export default function NewsCard({ news }) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col md:flex-row gap-5 p-4 mb-6">
      
      {/* 1. Hình ảnh bài báo - Cho phép click vào ảnh để xem chi tiết */}
      <Link to={`/news/${news.id}`} className="w-full md:w-56 h-40 flex-shrink-0 overflow-hidden rounded-lg">
        <img 
          src={news.image} 
          alt={news.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </Link>

      {/* Nội dung chữ */}
      <div className="flex flex-col justify-between py-1">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              {news.category}
            </span>
            <span className="text-gray-400 text-xs">{news.date}</span>
          </div>
          
          {/* 2. Tiêu đề bài báo - Bao bọc bằng Link */}
          <Link to={`/news/${news.id}`}>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2 leading-tight cursor-pointer">
              {news.title}
            </h3>
          </Link>
          
          <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">
            {news.description}
          </p>
        </div>

        {/* 3. Nút Đọc tiếp - Cũng nên là một Link */}
        <Link 
          to={`/news/${news.id}`} 
          className="text-red-700 text-xs font-bold mt-4 flex items-center hover:underline w-fit"
        >
          Đọc tiếp ➜
        </Link>
      </div>
    </div>
  );
}