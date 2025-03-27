import { processSteps } from "./homeUtils";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-base-200/70">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent-content">
            How It Works
          </h2>
          <p className="text-lg max-w-2xl mx-auto opacity-75">
            Our streamlined process makes implementation quick and easy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="card bg-base-300 rounded-sm hover:shadow-accent-content shadow-lg hover:shadow-[5px_5px_2px_2px_gray] transition-shadow duration-500 cursor-pointer"
            >
              <figure>
                <img
                  src={step.imageUrl}
                  alt={step.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <div className="badge badge-primary badge-lg mb-2">
                  {step.number}
                </div>
                <h3 className="card-title">{step.title}</h3>
                <p>{step.description}</p>
                <ul className="space-y-2 mt-4">
                  <li className="flex items-center">
                    <div className="badge badge-primary badge-xs mr-2"></div>
                    <span>
                      {index === 0
                        ? "Register account"
                        : index === 1
                        ? "Connect APIs"
                        : "Go live with one click"}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="badge badge-primary badge-xs mr-2"></div>
                    <span>
                      {index === 0
                        ? "Configure settings"
                        : index === 1
                        ? "Import existing data"
                        : "Monitor performance"}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <div className="badge badge-primary badge-xs mr-2"></div>
                    <span>
                      {index === 0
                        ? "Invite team members"
                        : index === 1
                        ? "Verify connections"
                        : "Scale resources dynamically"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
