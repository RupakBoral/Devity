import { useEffect, useState } from "react";
import Footer from "../utils/Footer";
import Navbar from "./Home/Navbar";
import { useDispatch } from "react-redux";
import { homeSetting } from "../../utils/homeSlice";
import Hero from "./Home/Hero";
import Features from "./Home/Features";
import HowItWorks from "./Home/HowItWorks";
import CTA from "./Home/CTA";

const Home = () => {
  const dispatch = useDispatch();
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    dispatch(homeSetting(true));
    const handleScroll = () => setShowScrollButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div
      data-theme="dark"
      className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-950 mt-20 transition-all duration-500 ease-in-out z-60"
    >
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />

      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50"
          aria-label="Scroll to top"
        >
          ⬆
        </button>
      )}
    </div>
  );
};

export default Home;
