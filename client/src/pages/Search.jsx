import React from "react";
import { useParams } from "react-router-dom";
import { NEWS_DATA } from "../data";
import NewsCard from "../components/NewsCard";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const results = NEWS_DATA.filter(item => 
    item.title.toLowerCase().includes(query) || 
    item.description.toLowerCase().includes(query)
  );

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <h2 className="text-xl mb-6">Kết quả cho: <span className="font-bold text-red-700">"{query}"</span></h2>
      {results.length > 0 ? (
        results.map(item => <NewsCard key={item.id} news={item} />)
      ) : (
        <p className="text-gray-500 italic">Không tìm thấy tin tức nào khớp với từ khóa.</p>
      )}
    </main>
  );
}