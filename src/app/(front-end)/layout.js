import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function FrontendLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
     
      <main className="flex-grow">
        <Navbar />
        {children}
        <Footer />
      </main>
    </div>
  );
}