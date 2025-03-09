import Footer from "../utils/Footer";

const AboutMe = () => {
  return (
    <div className="w-screen h-full">
      <div className="max-w-3xl border-2 border-accent-content text-white p-4 md:p-8 lg:p-8 my-20 rounded-lg shadow-lg shadow-accent-content text-center mx-4 md:mx-auto lg:mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">About Me</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          I am a passionate{" "}
          <span className="text-yellow-400">full-stack developer</span>{" "}
          dedicated to crafting scalable and efficient web applications. My
          expertise lies in{" "}
          <span className="text-yellow-400">React, Node.js, and MongoDB</span>,
          where I create seamless user experiences with clean, maintainable
          code.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {[
            "React",
            "Node.js",
            "Express.js",
            "Tailwind CSS",
            "Daisy UI",
            "Redux",
            "JWT",
            "MongoDB",
            "CPP",
            "C",
            "Java",
          ].map((skill) => (
            <span
              key={skill}
              className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold text-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-6">
          <button className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition">
            Lets Connect
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutMe;
