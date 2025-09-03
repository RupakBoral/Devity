import { FiChevronLeft } from "react-icons/fi";
import Footer from "../utils/Footer";
import { useNavigate } from "react-router-dom";

const AboutMe = () => {
  const navigate = useNavigate();
  return (
    <section className="w-screen h-full bg-black">
      <div className="max-w-3xl border-2 border-accent-content flex flex-col items-center gap-6 text-white p-6 md:p-10 lg:p-12 my-20 rounded-lg shadow-lg shadow-accent-content text-center mx-4 md:mx-auto lg:mx-auto">
        <h1 className="text-4xl font-bold text-cyan-700 mb-4">About Me</h1>

        <p className="text-lg text-gray-300 leading-relaxed">
          Hey, I’m <span className="text-yellow-400">Rupak Boral</span>, a{" "}
          <span className="text-yellow-400">Full-Stack Developer</span> who
          loves building impactful digital experiences. I enjoy solving
          real-world problems with code and turning ideas into scalable
          products.
        </p>

        <p className="text-lg text-gray-300 leading-relaxed mt-4">
          I’m the creator of <span className="text-yellow-400">Devity</span> — a
          platform where developers can share projects, collaborate, and grow
          together. My focus is on creating clean, maintainable, and efficient
          applications that not only work but also make a difference.
        </p>

        <p>
          I dedicated my heart and soul building this project, I hope you ❤️ and
          enjoy using it. If you find any issues kindly contact me @email
        </p>

        <FiChevronLeft
          aria-label="back"
          onClick={() => {
            navigate(-1);
          }}
          className="w-8 h-8 cursor-pointer"
        />
      </div>
      <Footer />
    </section>
  );
};

export default AboutMe;
