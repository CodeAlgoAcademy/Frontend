import React from "react";
import { 
  Code2, 
  Brain, 
  Calendar, 
  MapPin, 
  Star,
  PlayCircle,
  TrendingUp,
  Users,
  Award,
  BookOpen,
  Target,
  Zap,
  Quote
} from "lucide-react";
import { useTranslation } from "react-i18next";

const HomepageExpandedContent = () => {
const { t } = useTranslation("home");

const teacherStories = [
    {
      name: "Alexis R.",
      role: "Fourth Grade Teacher",
      achievement: "100% of students now show interest in programming",
      videoId: "85iqLQCrgaU"
    },
    {
      name: "Kevin F.",
      role: "Executive Director",
      achievement: "Entire school K-8 participating and building projects",
      videoId: "0MbxPAUDvww"
    },
   {
    name: "Mrs. Ragsdale",
    role: "2nd Grade Teacher",
    achievement: "CodeAlgo provides opportunities, mentorship, life skills, and positive alternatives for young people.",
    videoId: "FeqPkL8WKU8"
    },

  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-10 px-4  sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <h2 className="mb-3 text-3xl font-extrabold text-gray-900 md:text-5xl text-center">
            {t("whatParentsAndTeachersAreSaying")}
          </h2>
          <p className="text-center md:text-xl text-md text-gray-600 max-w-2xl mx-auto mb-12">
            {t("realFeedbackFromOurCommunity")}
          </p>
        </div>
        
       <div className="mb-10">
  <div className="grid gap-8 md:grid-cols-2 ">
    {teacherStories.map((story, idx) => (
      <div key={idx} className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow font-thabit">
        <div className="aspect-video w-full">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${story.videoId}`}
            title={`Success story: ${story.name}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-gray-900">{story.name}</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="text-gray-700">{story.role}</span>
          </div>
          <div className="flex items-start gap-2">
            <Award className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
            <p className="text-gray-700">{story.achievement}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
            {t("whyParentsChooseCodeAlgo")} <span className="text-yellow-300">{t("kidsCodingCourses")}</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 font-thabit">
            <div>
              <p className="mb-4 text-blue-50">
                {t("codingForKids")} — {t("heroDescription")}
              </p>
              <p className="mb-4 text-blue-50">
                {t("pythonDescription")}
              </p>
              <p className="text-blue-50">
                {t("onlineClassesDescription")}
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {t("whatKidsLearn")}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
                  <span>{t("algorithmThinking")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
                  <span>{t("pythonFundamentals")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
                  <span>{t("gameDevelopmentBasics")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
                  <span>{t("logicalReasoning")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
                  <span>{t("creativeProjectBuilding")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomepageExpandedContent;
