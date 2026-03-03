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
      title: "Block-Based Coding",
      description: "Perfect for ages 6–14, giving a visual introduction to programming logic through our specialized kids coding courses.",
      color: "purple",
      keyword: "kids coding courses"
    },
    {
      icon: <Globe className="h-6 w-6 text-orange-600" />,
      title: "Online Coding Classes",
      description: "Self-paced online coding classes that kids can access anytime, anywhere from the comfort of home.",
      color: "orange",
      keyword: "online coding classes"
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-indigo-600" />,
      title: "For Kids Ages 6-14",
      description: "Age-appropriate curriculum designed specifically for young minds, from elementary to early middle school.",
      color: "indigo",
      keyword: "kids ages 6-14"
    },
    {
      icon: <Gamepad2 className="h-6 w-6 text-pink-600" />,
      title: "Learn Through Games",
      description: "Turn coding into play! Our game-based approach keeps kids engaged while they master programming concepts.",
      color: "pink",
      keyword: "learn programming through games"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white px-4 py-10 sm:px-6 ">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
            The #1 Coding Platform for Kids
          </h1>
          <p className="mx-auto max-w-3xl text-md text-gray-600 md:text-xl">
            CodeAlgo Academy makes learning to code genuinely fun. Our game-based
            platform turns coding for kids into an adventure, where every lesson
            is a level, every project is a quest, and every child becomes a
            builder.
          </p>
        </div>

        <div className="mb-20 text-center">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {learningPaths.map((item, idx) => (
              <div
                key={idx}
                className="group font-thabit rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-lg hover:ring-2 hover:ring-blue-500"
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