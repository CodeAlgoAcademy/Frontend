import { Book, Users, Clock, Shield, Sparkles, TrendingUp,BookOpen, ShieldCheck  } from 'lucide-react';

export const parentResources = [
  { id: "gettingStartedGuide", icon: Book },
  { id: "onlineSafetyTips", icon: Shield },
  { id: "managingScreenTime", icon: Clock },
  { id: "trackingProgress", icon: TrendingUp },
  { id: "encouragingLearning", icon: Sparkles },
  { id: "familyCodingActivities", icon: Users },
];

export const teacherResources = [
  { id: "curriculumGuide", icon: BookOpen },
  { id: "classroomManagement", icon: Users },
  { id: "assessmentTools", icon: TrendingUp },
  { id: "lessonPlans", icon: Sparkles },
  { id: "progressReports", icon: Clock },
  { id: "schedulingTools", icon: ShieldCheck },
];

export const howToGuidesParent = [1, 2, 3, 4, 5];
export const howToGuides = [1, 2, 3, 4, 5, 6, 7];