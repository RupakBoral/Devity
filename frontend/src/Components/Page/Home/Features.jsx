import {
  FaUsers,
  FaLightbulb,
  FaHandsHelping,
  FaProjectDiagram,
  FaSeedling,
  FaStar,
} from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaProjectDiagram size={30} />,
      title: "Project Sharing",
      desc: "Showcase your projects, get feedback, and inspire others.",
    },
    {
      icon: <FaLightbulb size={30} />,
      title: "Idea Exchange",
      desc: "Post your ideas or explore new ones to spark collaboration.",
    },
    {
      icon: <FaUsers size={30} />,
      title: "Collaboration",
      desc: "Join forces with developers and build together.",
    },
    {
      icon: <FaHandsHelping size={30} />,
      title: "Helping Each Other",
      desc: "Offer your skills and support fellow developers.",
    },
    {
      icon: <FaSeedling size={30} />,
      title: "Growth",
      desc: "Improve your skills by working on real projects with peers.",
    },
    {
      icon: <FaStar size={30} />,
      title: "Free Forever",
      desc: "Learning and sharing should be free — always.",
    },
  ];

  return (
    <main id="features" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
      <section className="grid md:grid-cols-3 gap-8 text-center">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-6 border border-accent/60 bg-gradient-to-br from-blue-950 to-emerald-700 hover:shadow-lg hover:shadow-blue-300 duration-500 rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            <div className="mb-4 text-primary flex justify-center">
              {f.icon}
            </div>
            <h2 className="font-bold text-xl mb-2">{f.title}</h2>
            <p className="opacity-80">{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Features;
