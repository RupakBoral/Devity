const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="p-6 bg-gradient-to-bl from-gray-900 via-gray-800 to-gray-950 py-20 px-6 border-y border-accent/80"
    >
      <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-start gap-4">
          <span className="badge badge-primary">1</span>
          <p>Create your profile and join the Devity community.</p>
        </div>
        <div className="flex items-start gap-4">
          <span className="badge badge-primary">2</span>
          <p>Share your project or idea with others.</p>
        </div>
        <div className="flex items-start gap-4">
          <span className="badge badge-primary">3</span>
          <p>Request or offer help to collaborate on projects.</p>
        </div>
        <div className="flex items-start gap-4">
          <span className="badge badge-primary">4</span>
          <p>Build together, grow together, and celebrate success!</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
