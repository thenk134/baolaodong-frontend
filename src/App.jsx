import Header from "./componets/Header";
import Footer from "./componets/Footer";
import NewsCard from "./componets/NewsCard";
import { NEWS_DATA } from "./data"

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Cột chính hiển thị tin tức */}
          <div className="md:w-2/3">
            <h2 className="text-xl font-black text-gray-800 border-l-4 border-red-700 pl-4 mb-8 uppercase tracking-tight">
              Tin tức dành cho bạn
            </h2>
            
            {/* Vòng lặp hiển thị danh sách tin */}
            {NEWS_DATA.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>

          {/* Cột Sidebar (Tạm thời để trống hoặc ghi nội dung nhỏ) */}
          <div className="md:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 text-red-700">Tiện ích lao động</h3>
              <div className="space-y-4 text-sm font-medium">
                <div className="p-3 bg-red-50 text-red-700 rounded-lg cursor-pointer hover:bg-red-100">🧮 Tính lương Gross - Net</div>
                <div className="p-3 bg-blue-50 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-100">🏥 Tra cứu mã số BHXH</div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;