import React from "react";
import { 
  Code2, 
  Blocks, 
  Globe, 
  Brain, 
  TrendingUp,
  Gamepad2,
  LayoutDashboard,
  GraduationCap,
  Clock,
  Sparkles
} from "lucide-react";

const HomepageContent = () => {
 const learningPaths = [
    {
      icon: <Brain className="h-6 w-6 text-blue-600" />,
      title: "Algorithms & Problem Solving",
      description: "Kids learn to think like engineers, breaking problems into steps and building logical solutions.",
      color: "blue",
      keyword: "coding for kids"
    },
    {
      icon: <Code2 className="h-6 w-6 text-green-600" />,
      title: "Python for Kids",
      description: "One of the world's most in-demand languages, taught through interactive challenges designed specifically for young learners.",
      color: "green",
      keyword: "Python for kids"
    },
    {
      icon: <Blocks className="h-6 w-6 text-purple-600" />,
      title: "Scratch & Block-Based Coding",
      description: "Perfect for ages 6–9, giving a visual introduction to programming logic through our specialized kids coding courses.",
      color: "purple",
      keyword: "kids coding courses"
    },
    {
      icon: <Globe className="h-6 w-6 text-orange-600" />,
      title: "Learn Programming Online",
      description: "Older students explore HTML, CSS, and JavaScript through our interactive platform, building real web projects they can share.",
      color: "orange",
      keyword: "learn programming online"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-red-600" />,
      title: "Data Structures & Algorithms",
      description: "For advanced learners preparing for competitive programming and college-level computer science.",
      color: "red",
      keyword: "coding for kids"
    }
  ];;


  return (
    <section className="bg-gradient-to-b from-gray-50 to-white px-4 py-16 font-inter sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            The #1 Coding Platform for Kids
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 md:text-xl">
            CodeAlgo Academy makes learning to code genuinely fun. Our game-based
            platform turns coding for kids into an adventure — where every lesson
            is a level, every project is a quest, and every child becomes a
            builder.
          </p>
        </div>


        <div className="mb-20">
          <h2 className="mb-3 text-3xl font-bold text-gray-900">What Kids Learn</h2>
          <p className="mb-10 text-lg text-gray-600">
            Our curriculum covers a wide range of programming languages and
            computer science concepts, introduced progressively based on age and
            skill level.
          </p>
          
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {learningPaths.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-lg hover:ring-2 hover:ring-blue-500"
              >
                <div className={`mb-4 inline-block rounded-xl bg-${item.color}-50 p-3 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <span className="mt-3 inline-block text-xs font-medium text-blue-600">
                  #{item.keyword}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageContent;