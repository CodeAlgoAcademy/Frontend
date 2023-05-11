export interface SkillTests {
   testId: string;
   testTitle: string;
}

export interface SkillDetails {
   categoryId: string;
   categoryTitle: string;
   tests: SkillTests[];
}
