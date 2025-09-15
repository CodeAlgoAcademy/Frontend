interface TimeLimit {
  id: number;
  timeLimit: string;       // Format: HH:MM:SS
  dayOfTheWeek: string;    // e.g., "Monday"
}

interface ActivePlan {
  id: number;
  name: string;            // e.g., "Parent & Family"
  duration_in_days: number; // e.g., 365
  access_level: number;     // e.g., 3
}

export interface StudentProfile {
  id: string  | number;
  xp: number;
  coins: number;
  level: number;
  current_mission: string;
  question_level: number;
  skill: string;
  progress: number;
  timeLimits: TimeLimit[];
  activePlan: ActivePlan;
}
