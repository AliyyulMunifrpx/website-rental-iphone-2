import Navbar from "../navbar.jsx";
import Footer from "../footer.jsx";
import Image from "next/image.js";

export default function MainLayout({ children }) {
  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden bg-primary">
      {/* Background gradient full page */}
      <div className="absolute inset-0 fixed z-0">
        <Image
          alt="gradient background"
          src="/assets/gradient.webp"
          width={1000}
          height={1000}
         className="scale-250 translate-x-[70%] -translate-y-[40%] lg:-translate-y-[80%]"></Image>
      </div>
      <div className="absolute inset-0 fixed z-0">
        <Image
          alt="gradient background"
          src="/assets/gradient.webp"
          width={1000}
          height={1000}
         className="scale-250 -translate-x-[120%] translate-y-[60%] lg:-translate-y-[0%]"></Image>
      </div>
      {/* Navbar */}
      <div className="fixed top-0 left-0 z-20 w-full">
        <Navbar />
      </div>

      {/* Content */}
      <main className="relative z-10 w-full">
        {children}
        <Footer />
      </main>
    </div>
  );
}
