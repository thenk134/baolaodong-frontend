import React from "react";
 import { useParams } from "react-router-dom";
 import { NEWS_DATA } from "../data";
 import NewsCards from "../components/NewsCard";

export default function Category() {
  const { slug } = useParams();

  // Lọc tin tức theo danh mục (Giả sử trong data.js bạn để category là 'Việc làm', 'Pháp luật')
  // Chúng ta sẽ so sánh không phân biệt hoa thường và bỏ dấu nếu cần, 
  // nhưng ở mức cơ bản, hãy so sánh trực tiếp hoặc qua slug.
  const filteredNews = NEWS_DATA.filter(item => 
    item.category.toLowerCase().replace(/\s+/g, '-') === slug
  );

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <h2 className="text-2xl font-black text-gray-800 border-l-4 border-red-700 pl-4 mb-8 uppercase">
        Chuyên mục: {slug.replace(/-/g, ' ')}
      </h2>

      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredNews.map(item => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 italic">Chưa có bài viết nào trong chuyên mục này.</p>
        </div>
      )}
    </main>
  );
}