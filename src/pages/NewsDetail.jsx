import { useParams, Link } from "react-router-dom";
import {NEWS_DATA} from '../data'

export default function NewsDetail() {
  const { id } = useParams();
  const article = NEWS_DATA.find(item => item.id === parseInt(id));

  if (!article) return <div className="p-10 text-center">Không tìm thấy bài viết!</div>;

  return (
    <main className="container mx-auto px-4 py-10 max-w-3xl bg-white mt-5 shadow-sm rounded-lg">
      <Link to="/" className="text-red-700 font-bold mb-4 inline-block hover:underline">
        ← Quay lại trang chủ
      </Link>
      
      <h1 className="text-3xl font-black text-gray-900 mb-4 leading-tight">
        {article.title}
      </h1>
      
      <div className="flex items-center text-gray-500 text-sm mb-6 border-b pb-4">
        <span className="bg-red-700 text-white px-2 py-1 rounded mr-3">{article.category}</span>
        <span>{article.date}</span>
      </div>

      <img src={article.image} alt="" className="w-full h-auto rounded-xl mb-8" />
      
      <div className="text-gray-800 leading-relaxed text-lg space-y-4">
        <p className="font-semibold italic text-gray-600">{article.description}</p>
        <p>Đây là khu vực hiển thị nội dung chi tiết của bài báo. Trong thực tế, dữ liệu này sẽ được lấy từ Backend...</p>
        <p>Người lao động cần lưu ý các quy định mới để đảm bảo quyền lợi của chính mình.</p>
      </div>
    </main>
  );
}