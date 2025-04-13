import { useEffect, useState } from "react";
import Footer from "../utils/Footer";
import Hero from "./Home/Hero";
import Features from "./Home/Features";
import HowItWorks from "./Home/HowItWorks";
import CTA from "./Home/CTA";
import Navbar from "./Home/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { homeSetting } from "../../utils/homeSlice";
// import Loading from "../utils/Loading";

const Home = () => {
  // const home = useSelector((store) => store.home);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(homeSetting(true));
    // if (!home) return <Loading />;
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      data-theme="dark"
      className="min-h-screen -mt-20 transition-all duration-500 ease-in-out z-60"
    >
      {/*Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />

      {/* Scroll to top button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Home;
