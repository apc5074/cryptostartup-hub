
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LoadingState = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </main>
      <Footer />
    </div>
  );
};

export default LoadingState;
