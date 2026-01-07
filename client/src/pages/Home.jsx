import React, { useState, useEffect } from 'react';

export default function Home() {
  const [news, setNews] = useState([]); // Khởi tạo là mảng rỗng

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then(data => {
        // Kiểm tra nếu data là mảng thì mới set, không thì set mảng rỗng
        if (Array.isArray(data)) {
          setNews(data);
        } else {
          console.error("Dữ liệu không phải mảng:", data);
          setNews([]); 
        }
      })
      .catch(err => {
        console.error("Lỗi fetch:", err);
        setNews([]);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Tin tức Lao Động</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dùng news?.map để an toàn hơn */}
        {news && news.length > 0 ? (
          news.map((item, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-md bg-white">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
                <a href={item.link} target="_blank" rel="noreferrer" className="text-blue-500 mt-2 block">Xem thêm</a>
              </div>
            </div>
          ))
        ) : (
          <p>Đang tải dữ liệu hoặc không có tin tức nào...</p>
        )}
      </div>
    </div>
  );
}