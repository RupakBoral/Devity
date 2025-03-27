import { features } from "./homeUtils";

const Features = () => {
  return (
    <section id="features" className="py-20 bg-base-300/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent-content">
            Powerful Features
          </h2>
          <p className="text-lg max-w-2xl mx-auto opacity-75">
            Discover the tools that will revolutionize your workflow and boost
            productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-100 cursor-pointer rounded-sm hover:shadow-accent-content shadow-lg hover:shadow-[5px_5px_2px_2px_gray] transition-shadow duration-500"
            >
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="card-title">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
