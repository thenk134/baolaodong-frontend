import Footer from "./componets/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Phần Header và Main sẽ nằm ở đây */}
      <main className="flex-grow flex items-center justify-center p-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Nội dung trang báo</h1>
          <p className="text-gray-500 mt-2 italic">(Đang xây dựng...)</p>
        </div>
      </main>

      {/* Gọi Footer vào cuối */}
      <Footer />
    </div>
  );
}

export default App;