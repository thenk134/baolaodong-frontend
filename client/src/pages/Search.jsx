import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Phải import cái này
import NewsCard from "../components/NewsCard";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Gọi API lấy tin mới nhất để thực hiện tìm kiếm trên đó
    // Bạn có thể chọn nguồn 'tuoitre', 'nld' hoặc 'vnexpress'
    fetch(`http://localhost:5000/api/news/tuoitre/tin-moi-nhat`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(item => 
          item.title.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query)
        );
        setResults(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tìm kiếm:", err);
        setLoading(false);
      });
  }, [query]);

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl min-h-screen">
      <h2 className="text-2xl font-bold mb-6">
        Kết quả cho: <span className="text-red-700">"{query}"</span>
      </h2>

      {loading ? (
        <div className="text-center py-10">Đang tìm kiếm tin tức...</div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item, index) => (
            <NewsCard key={index} news={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border rounded-lg bg-gray-50">
          <p className="text-gray-500 italic">Không tìm thấy tin tức nào khớp với từ khóa của bạn.</p>
        </div>
      )}
    </main>
  );
}