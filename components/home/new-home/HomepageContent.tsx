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
import { useTranslation } from "react-i18next";

const HomepageContent = () => {
 const { t } = useTranslation("home");

 const learningPaths = [
    {
      icon: <Brain className="h-6 w-6 text-blue-600" />,
      title: t("algorithmsAndProblemSolving"),
      description: t("algorithmsDescription"),
      color: "blue",
      keyword: t("codingForKids")
    },
    {
      icon: <Code2 className="h-6 w-6 text-green-600" />,
      title: t("pythonForKidsTitle"),
      description: t("pythonDescription"),
      color: "green",
      keyword: t("pythonForKidsKeyword")
    },
    {
      icon: <Blocks className="h-6 w-6 text-purple-600" />,
      title: t("blockBasedCoding"),
      description: t("blockBasedDescription"),
      color: "purple",
      keyword: t("kidsCodingCourses")
    },
    {
      icon: <Globe className="h-6 w-6 text-orange-600" />,
      title: t("onlineCodingClasses"),
      description: t("onlineClassesDescription"),
      color: "orange",
      keyword: t("onlineCodingClassesKeyword")
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-indigo-600" />,
      title: t("forKidsAges6to14"),
      description: t("kidsAgesDescription"),
      color: "indigo",
      keyword: t("kidsAges6to14Keyword")
    },
    {
      icon: <Gamepad2 className="h-6 w-6 text-pink-600" />,
      title: t("learnThroughGames"),
      description: t("learnThroughGamesDescription"),
      color: "pink",
      keyword: t("learnProgrammingThroughGames")
    }
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white px-4 py-10 sm:px-6 ">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
            {t("codingPlatformForKids")}
          </h1>
          <p className="mx-auto max-w-3xl text-md text-gray-600 md:text-xl">
            {t("heroDescription")}
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
                  {item.keyword}
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
