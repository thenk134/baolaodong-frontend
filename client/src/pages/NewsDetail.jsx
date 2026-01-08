
//import { useParams, Link } from "react-router-dom";
//import {NEWS_DATA} from '../data'
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function NewsDetail() {
  const [searchParams] = useSearchParams();
  // Bây giờ useState và useEffect đã được định nghĩa và sẽ không còn lỗi
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const targetUrl = searchParams.get("url");

  useEffect(() => {
    if (!targetUrl) return;

    fetch(`http://localhost:5000/api/news-detail?url=${encodeURIComponent(targetUrl)}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi Fetch:", err);
        setLoading(false);
      });
  }, [targetUrl]);

  if (loading) return <div className="p-10 text-center animate-pulse">Đang lấy bài viết từ VnExpress...</div>;

  return (
    <main className="container mx-auto px-4 py-10 max-w-3xl bg-white mt-5 shadow-lg rounded-lg">
      <Link to="/" className="text-blue-600 font-semibold mb-6 inline-block hover:underline">
        ← Quay lại trang chủ
      </Link>
      
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
        {article.title}
      </h1>
      
      <div className="prose max-w-none">
        {/* Mô tả ngắn */}
        <p className="font-bold text-gray-700 mb-8 text-xl leading-snug border-l-4 border-blue-600 pl-4">
          {article.description}
        </p>
        
        {/* Nội dung chi tiết */}
        <div 
          className="content-body"
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />
      </div>
      
      <footer className="mt-10 pt-6 border-t text-gray-400 italic text-sm">
        Nguồn dữ liệu: VnExpress.net
      </footer>
    </main>
  );
}