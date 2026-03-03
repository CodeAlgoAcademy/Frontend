const ValuePropositions = () => {
  const features = [
    {
      title: "Interactive Coding",
      description: "Game-based lessons that make learning to code fun and engaging."
    },
    {
      title: "Real Projects",
      description: "Build actual games, apps, and websites as you learn."
    },
    {
      title: "Progress Tracking",
      description: "Watch your child’s confidence and skills grow over time."
    }
  ];

  return (
    <section className="relative bg-gray-50 py-20 ">
      <div className="container mx-auto px-6">

         <h2 className="mb-4 text-center text-3xl font-extrabold md:text-4xl">
          Everything Your Child Needs to Succeed in Coding
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
          A complete learning experience designed to build real skills.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-lg transition hover:shadow-xl"
            >
              <h3 className="mb-2 text-xl font-bold">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ValuePropositions;
