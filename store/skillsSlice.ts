import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SkillDetails } from "../types/interfaces";

const CTSA_ONE = [
  {
    categoryId: "1A-AP-08",
    categoryTitle:
      "Model daily processes by creating and following algorithms (sets of step-by-step instructions) to complete tasks.",
    tests: [{ testId: "1", testTitle: "test1" }],
  },
  {
    categoryId: "1A-AP-09",
    categoryTitle:
      "Model the way programs store and manipulate data by using numbers or other symbols to represent information.",
    tests: [{ testId: "2", testTitle: "test2" }],
  },
  {
    categoryId: "1A-AP-10",
    categoryTitle:
      "Develop programs with sequences and simple loops, to express ideas or address a problem.",
    tests: [{ testId: "3", testTitle: "test3" }],
  },
  {
    categoryId: "1A-AP-11",
    categoryTitle:
      "Decompose (break down) the steps needed to solve a problem into a precise sequence of instructions.",
    tests: [{ testId: "4", testTitle: "test4" }],
  },
  {
    categoryId: "1A-AP-12",
    categoryTitle:
      "Develop plans that describe a program’s sequence of events, goals, and expected outcomes.",
    tests: [{ testId: "5", testTitle: "test5" }],
  },
  {
    categoryId: "1A-AP-13",
    categoryTitle:
      "Give attribution when using the ideas and creations of others while developing programs.",
    tests: [{ testId: "6", testTitle: "test6" }],
  },
  {
    categoryId: "1A-AP-14",
    categoryTitle:
      "Debug (identify and fix) errors in an algorithm or program that includes sequences and simple loops.",
    tests: [{ testId: "7", testTitle: "test7" }],
  },
  {
    categoryId: "1A-AP-15",
    categoryTitle:
      "Using correct terminology, describe steps taken and choices made during the iterative process of program development.",
    tests: [{ testId: "8", testTitle: "test8" }],
  },
];
const CTSA_TWO = [
  {
    categoryId: "1B-AP-08",
    categoryTitle:
      " Compare and refine multiple algorithms for the same task and determine which is the most appropriate.",
    tests: [{ testId: "9", testTitle: "test1" }],
  },
  {
    categoryId: "1B-AP-09",
    categoryTitle:
      " Create programs that use variables to store and modify data.",
    tests: [{ testId: "10", testTitle: "test2" }],
  },
  {
    categoryId: "1B-AP-10",
    categoryTitle:
      " Create programs that include sequences, events, loops, and conditionals.",
    tests: [{ testId: "11", testTitle: "test3" }],
  },
  {
    categoryId: "1B-AP-11",
    categoryTitle:
      " Decompose (break down) problems into smaller, manageable subproblems to facilitate the program development process.",
    tests: [{ testId: "12", testTitle: "test4" }],
  },
  {
    categoryId: "1B-AP-12",
    categoryTitle:
      " Modify, remix, or incorporate portions of an existing program into one's own work, to develop something new or add more advanced features.",
    tests: [{ testId: "13", testTitle: "test5" }],
  },
  {
    categoryId: "1B-AP-13",
    categoryTitle:
      " Use an iterative process to plan the development of a program by including others' perspectives and considering user preferences.",
    tests: [{ testId: "14", testTitle: "test6" }],
  },
  {
    categoryId: "1B-AP-14",
    categoryTitle:
      " Observe intellectual property rights and give appropriate attribution when creating or remixing programs.",
    tests: [{ testId: "15", testTitle: "test7" }],
  },
  {
    categoryId: "1B-AP-15",
    categoryTitle:
      " Test and debug (identify and fix errors) a program or algorithm to ensure it runs as intended.",
    tests: [{ testId: "16", testTitle: "test8" }],
  },
  {
    categoryId: "1B-AP-16",
    categoryTitle:
      " Take on varying roles, with teacher guidance, when collaborating with peers during the design, implementation, and review stages of program development.",
    tests: [{ testId: "17", testTitle: "test9" }],
  },
  {
    categoryId: "1B-AP-17",
    categoryTitle:
      " Describe choices made during program development using code comments, presentations, and demonstrations",
    tests: [{ testId: "18", testTitle: "test10" }],
  },
];
const CTSA_THREE = [
  {
    categoryId: "2-AP-10",
    categoryTitle:
      "Use flowcharts and/or pseudocode to address complex problems as algorithms.",
    tests: [{ testId: "19", testTitle: "test1" }],
  },
  {
    categoryId: "2-AP-11",
    categoryTitle:
      "Create clearly named variables that represent different data types and perform operations on their values.",
    tests: [{ testId: "20", testTitle: "test2" }],
  },
  {
    categoryId: "2-AP-12",
    categoryTitle:
      "Design and iteratively develop programs that combine control structures, including nested loops and compound conditionals.",
    tests: [{ testId: "21", testTitle: "test3" }],
  },
  {
    categoryId: "2-AP-13",
    categoryTitle:
      "Decompose problems and subproblems into parts to facilitate the design, implementation, and review of programs.",
    tests: [{ testId: "22", testTitle: "test4" }],
  },
  {
    categoryId: "2-AP-14",
    categoryTitle:
      "Create procedures with parameters to organize code and make it easier to reuse.",
    tests: [{ testId: "23", testTitle: "test5" }],
  },
  {
    categoryId: "2-AP-15",
    categoryTitle:
      "Seek and incorporate feedback from team members and users to refine a solution that meets user needs.",
    tests: [{ testId: "24", testTitle: "test6" }],
  },
  {
    categoryId: "2-AP-16",
    categoryTitle:
      "Incorporate existing code, media, and libraries into original programs, and give attribution.",
    tests: [{ testId: "25", testTitle: "test7" }],
  },
  {
    categoryId: "2-AP-17",
    categoryTitle:
      "Systematically test and refine programs using a range of test cases.",
    tests: [{ testId: "26", testTitle: "test8" }],
  },
  {
    categoryId: "2-AP-18",
    categoryTitle:
      "Distribute tasks and maintain a project timeline when collaboratively developing computational artifacts.",
    tests: [{ testId: "27", testTitle: "test9" }],
  },
  {
    categoryId: "2-AP-19",
    categoryTitle:
      "Document programs in order to make them easier to follow, test, and debug.",
    tests: [{ testId: "28", testTitle: "test10" }],
  },
];
const KANSAS_ONE = [
  {
    categoryId: "K.AP.V.01",
    categoryTitle:
      "Recognize that numbers represent different types of data using numbers or other symbols ",
    tests: [{ testId: "29", testTitle: "test1" }],
  },
  {
    categoryId: "K.AP.C.01",
    categoryTitle:
      "Independently or collaboratively create programs to accomplish tasks",
    tests: [{ testId: "30", testTitle: "test2" }],
  },
  {
    categoryId: "K.AP.M.01",
    categoryTitle:
      "With guidance, decompose (break down) a larger problem into smaller subproblems or combine simple tasks to make something more complex.",
    tests: [{ testId: "31", testTitle: "test3" }],
  },
  {
    categoryId: "K.AP.PD.01",
    categoryTitle:
      "Create a design document to illustrate thoughts, ideas and stories in a sequential manner ",
    tests: [{ testId: "32", testTitle: "test4" }],
  },
  {
    categoryId: "K.AP.PD.02",
    categoryTitle:
      "Give credit to ideas, creations, and solutions of others while developing algorithms",
    tests: [{ testId: "33", testTitle: "test5" }],
  },
  {
    categoryId: "K.AP.PD.03",
    categoryTitle:
      "Independently or collaboratively construct, execute, and debug (identify and fix) algorithms ",
    tests: [{ testId: "34", testTitle: "test6" }],
  },
  {
    categoryId: "K.AP.PD.04",
    categoryTitle:
      "Use correct terminology in the development of an algorithm to solve a simple problem (e.g. beginning, middle, end).",
    tests: [{ testId: "35", testTitle: "test7" }],
  },
];
const KANSAS_TWO = [
  {
    categoryId: "1.AP.V.01",
    categoryTitle:
      "Model the way that programs store and manipulate data by using numbers or other symbols to represent information",
    tests: [{ testId: "36", testTitle: "test1" }],
  },
  {
    categoryId: "1.AP.C.01",
    categoryTitle:
      "Independently, or collaboratively construct algorithms (sets of step-by-step instructions) to accomplish tasks",
    tests: [{ testId: "37", testTitle: "test2" }],
  },
  {
    categoryId: "1.AP.M.01",
    categoryTitle:
      "With guidance, decompose (break down) the steps needed to solve a problem into a precise sequence of instructions.",
    tests: [{ testId: "38", testTitle: "test3" }],
  },
  {
    categoryId: "1.AP.PD.01",
    categoryTitle:
      "Independently or with guidance, create a grade-level appropriate artifact to illustrate thoughts, ideas, or stories in a sequential.",
    tests: [{ testId: "39", testTitle: "test4" }],
  },
  {
    categoryId: "1.AP.PD.03",
    categoryTitle:
      "With guidance, independently, or collaboratively construct, execute, and debug (identify and fix) programs using a programming language and/or unplugged activity that includes sequencing and repetition.",
    tests: [{ testId: "40", testTitle: "test5" }],
  },
  {
    categoryId: "1.AP.PD.04",
    categoryTitle:
      "Use correct terminology (first, second, third) and explain the choices made in the development or an algorithm to solve a simple problem.",
    tests: [{ testId: "41", testTitle: "test6" }],
  },
];
const KANSAS_THREE = [
  {
    categoryId: "2.AP.V.01",
    categoryTitle:
      "Use and model the way a computer program stores, accesses, and manipulates data that is represented as a variable.",
    tests: [{ testId: "42", testTitle: "test1" }],
  },
  {
    categoryId: "2.AP.C.01",
    categoryTitle:
      "Independently and collaboratively create programs to accomplish tasks using a programming language",
    tests: [{ testId: "43", testTitle: "test2" }],
  },
  {
    categoryId: "2.AP.M.01",
    categoryTitle:
      "Independently decompose (break down) a larger problem into smaller subproblems and steps needed to solve those problems.",
    tests: [{ testId: "44", testTitle: "test3" }],
  },
  {
    categoryId: "2.AP.PD.01",
    categoryTitle:
      "Independently create a grade-level appropriate artifact to illustrate thoughts, ideas, or stories in a sequential",
    tests: [{ testId: "45", testTitle: "test4" }],
  },
  {
    categoryId: "2.AP.PD.02",
    categoryTitle:
      "Give credit to ideas, creation (such as code, music, or pictures) and solutions of others while writing and developing programs",
    tests: [{ testId: "46", testTitle: "test5" }],
  },
  {
    categoryId: "2.AP.PD.03",
    categoryTitle:
      "Independently and collaboratively construct, execute, analyze and debug (fix) an algorithm using a programming language",
    tests: [{ testId: "47", testTitle: "test6" }],
  },
  {
    categoryId: "2.AP.PD.04",
    categoryTitle:
      "Use correct terminology (debug, program input/output, code) to explain the development of an algorithm to solve a problem",
    tests: [{ testId: "48", testTitle: "test7" }],
  },
];
const KANSAS_FOUR = [
  {
    categoryId: "3.AP.V.01",
    categoryTitle:
      "Utilize simple programs that use variables to store and modify grade level appropriate data.",
    tests: [{ testId: "49", testTitle: "test1" }],
  },
  {
    categoryId: "3.AP.C.01",
    categoryTitle:
      "Create simple programs using a programming language that utilize sequencing, repetition, conditionals, and variables to solve a problem or express ideas independently.",
    tests: [{ testId: "50", testTitle: "test2" }],
  },
  {
    categoryId: "3.AP.M.01",
    categoryTitle:
      "Decompose (break down) the steps needed to solve a problem into a precise sequence of instructions.",
    tests: [{ testId: "51", testTitle: "test3" }],
  },
  {
    categoryId: "3.AP.M.02",
    categoryTitle:
      "With grade appropriate complexity, modify, remix, or incorporate portions of an existing program into one's own work, to develop something new.",
    tests: [{ testId: "52", testTitle: "test4" }],
  },
  {
    categoryId: "3.AP.PD.01",
    categoryTitle:
      "Create a plan using an iterative process to plan the development of a program while solving simple problems.",
    tests: [{ testId: "53", testTitle: "test5" }],
  },
  {
    categoryId: "3.AP.PD.02",
    categoryTitle:
      "Use proper citations and document when ideas are borrowed and changed for their own use.",
    tests: [{ testId: "54", testTitle: "test6" }],
  },
  {
    categoryId: "3.AP.PD.03",
    categoryTitle:
      "Analyze and debug (identify/fix errors) a program that includes sequencing, repetition and variables in a programming language.",
    tests: [{ testId: "55", testTitle: "test7" }],
  },
  {
    categoryId: "3.AP.PD.04",
    categoryTitle:
      "Communicate and explain your program development using comments, presentations and demonstrations.",
    tests: [{ testId: "56", testTitle: "test8" }],
  },
];
const KANSAS_FIVE = [
  {
    categoryId: "4.AP.V.01",
    categoryTitle:
      " Utilize, create, and modify programs that use variables, with grade level appropriate data.",
    tests: [{ testId: "57", testTitle: "test1" }],
  },
  {
    categoryId: "4.AP.C.01",
    categoryTitle:
      "Create programs using a programming language that utilize sequencing, repetition, conditionals and variables to solve a problem",
    tests: [{ testId: "58", testTitle: "test2" }],
  },
  {
    categoryId: "4.AP.M.01",
    categoryTitle:
      "Decompose (break down) large problems into smaller, manageable subproblems. Then form algorithms to solve each subproblem.",
    tests: [{ testId: "59", testTitle: "test3" }],
  },
  {
    categoryId: "4.AP.M.02",
    categoryTitle:
      "With grade appropriate complexity, modify, remix, or incorporate portions of an existing program into one's own work, to develop something new.",
    tests: [{ testId: "60", testTitle: "test4" }],
  },
  {
    categoryId: "4.AP.PD.01",
    categoryTitle:
      "Create a plan using an iterative process to plan the development  of a program that includes user preferences while solving simple problems.",
    tests: [{ testId: "61", testTitle: "test5" }],
  },
  {
    categoryId: "4.AP.PD.02",
    categoryTitle:
      "Use proper citations and document when ideas are borrowed and changed for their own use.",
    tests: [{ testId: "62", testTitle: "test6" }],
  },
  {
    categoryId: "4.AP.PD.03",
    categoryTitle:
      "Analyze, debug (identify/fix errors), and create a program that includes sequencing, repetition and variables in a programming language.",
    tests: [{ testId: "63", testTitle: "test7" }],
  },
  {
    categoryId: "4.AP.PD.04",
    categoryTitle:
      "Communicate and explain your program development using comments, presentations and demonstrations.",
    tests: [{ testId: "64", testTitle: "test8" }],
  },
];
const KANSAS_SIX = [
  {
    categoryId: "5.AP.V.01",
    categoryTitle:
      "Utilize, create, and modify programs that use, modify, and combine variables with grade level appropriate data ",
    tests: [{ testId: "65", testTitle: "test1" }],
  },
  {
    categoryId: "5.AP.C.01",
    categoryTitle:
      "Create programs using a programming language that utilize sequencing, repetition, conditionals, event handlers, and variables to solve a problem",
    tests: [{ testId: "66", testTitle: "test2" }],
  },
  {
    categoryId: "5.AP.M.01",
    categoryTitle:
      "Decompose (break down) large problems into smaller, more manageable subproblems to facilitate the program development process. ",
    tests: [{ testId: "67", testTitle: "test3" }],
  },
  {
    categoryId: "5.AP.M.02",
    categoryTitle:
      "With grade appropriate complexity, modify, remix, or incorporate portions of an existing program into one's own work, to develop something new or add more advanced features.",
    tests: [{ testId: "68", testTitle: "test4" }],
  },
  {
    categoryId: "5.AP.PD.01",
    categoryTitle:
      "Create a plan using an iterative process for the development of a program that includes others' perspectives and user preferences while solving simple problems.",
    tests: [{ testId: "69", testTitle: "test5" }],
  },
  {
    categoryId: "5.AP.PD.02",
    categoryTitle:
      "Use proper citations and document when ideas are borrowed and changed for their own use.",
    tests: [{ testId: "70", testTitle: "test6" }],
  },
  {
    categoryId: "5.AP.PD.03",
    categoryTitle:
      "Analyze, debug (identify/fix errors), and create a program that includes sequencing, repetition and variables in a programming language.",
    tests: [{ testId: "71", testTitle: "test7" }],
  },
  {
    categoryId: "5.AP.PD.04",
    categoryTitle:
      " Take on varying roles collaborating with peers to give feedback at different stages of program development, including design and implementation.",
    tests: [{ testId: "72", testTitle: "test8" }],
  },
];
const KANSAS_SEVEN = [
  {
    categoryId: "5.AP.V.01",
    categoryTitle:
      "Utilize, create, and modify programs that use, modify, and combine variables with grade level appropriate data ",
    tests: [{ testId: "73", testTitle: "test1" }],
  },
  {
    categoryId: "8.AP.V.01",
    categoryTitle:
      " Create programs using variables with purposeful and thoughtful naming conventions for identifiers to improve program readability.	",
    tests: [{ testId: "74", testTitle: "test2" }],
  },
  {
    categoryId: "8.AP.C.01",
    categoryTitle:
      " Develop programs that utilize combinations of nested repetition, compound conditionals, procedures without parameters, and the manipulation of variables representing different data types.",
    tests: [{ testId: "75", testTitle: "test3" }],
  },
  {
    categoryId: "8.AP.M.01",
    categoryTitle:
      " Decompose problems and subproblems into parts to facilitate the design, implementation, and review of complex programs.",
    tests: [{ testId: "76", testTitle: "test4" }],
  },
  {
    categoryId: "8.AP.PD.01",
    categoryTitle:
      " Seek and incorporate feedback from team members and users to refine a solution to a problem that meets the needs of diverse users.",
    tests: [{ testId: "77", testTitle: "test5" }],
  },
  {
    categoryId: "8.AP.PD.02",
    categoryTitle:
      " Incorporate existing code, media, and libraries into original programs of increasing complexity and give attribution.",
    tests: [{ testId: "78", testTitle: "test6" }],
  },
  {
    categoryId: "8.AP.PD.03",
    categoryTitle:
      " Systematically test and refine programs using a range of student created inputs.",
    tests: [{ testId: "79", testTitle: "test7" }],
  },
  {
    categoryId: "8.AP.PD.04",
    categoryTitle:
      " Explain how effective communication between participants is required for successful collaboration when developing computational artifacts.",
    tests: [{ testId: "80", testTitle: "test8" }],
  },
  {
    categoryId: "8.AP.PD.05",
    categoryTitle:
      " Document text-based programs of increasing complexity in order to make them easier to follow, test, and debug.",
    tests: [{ testId: "81", testTitle: "test9" }],
  },
];
const NEW_YORK_ONE = [
  {
    categoryId: "K-1.CT.6",
    categoryTitle: "Follow an algorithm to complete a task.",
    tests: [{ testId: "82", testTitle: "test1" }],
  },
  {
    categoryId: "K-1.CT.8",
    categoryTitle:
      "Identify a task consisting of steps that are repeated, and recognize which steps are repeated.",
    tests: [{ testId: "83", testTitle: "test2" }],
  },
  {
    categoryId: "K-1.CT.9",
    categoryTitle: "Identify and fix (debug) errors within a simple algorithm.",
    tests: [{ testId: "84", testTitle: "test3" }],
  },
  {
    categoryId: "K-1.CT.10",
    categoryTitle:
      "Collaboratively create a plan that outlines the steps needed to complete a task. ",
    tests: [{ testId: "85", testTitle: "test4" }],
  },
  {
    categoryId: "K-1.CT.7",
    categoryTitle:
      "Identify terms that refer to different concrete values over time.",
    tests: [{ testId: "86", testTitle: "test5" }],
  },
];
const NEW_YORK_TWO = [
  {
    categoryId: "2-3.CT.6",
    categoryTitle: "Create two or more algorithms for the same task.",
    tests: [{ testId: "87", testTitle: "test1" }],
  },
  {
    categoryId: "2-3.CT.8",
    categoryTitle:
      "Identify steps within a task that should only be carried out under certain precise conditions. ",
    tests: [{ testId: "88", testTitle: "test2" }],
  },
  {
    categoryId: "2-3.CT.9",
    categoryTitle:
      "Identify and debug errors within an algorithm or program that includes sequencing or repetition. ",
    tests: [{ testId: "89", testTitle: "test3" }],
  },
  {
    categoryId: "2-3.CT.10",
    categoryTitle:
      "Develop and document a plan that outlines specific steps taken to complete a project.",
    tests: [{ testId: "90", testTitle: "test4" }],
  },
  {
    categoryId: "2-3.CT.7",
    categoryTitle:
      "Name/label key pieces of information in a set of instructions, noting whether each name/label refers to a fixed or changing value.",
    tests: [{ testId: "91", testTitle: "test5" }],
  },
];
const NEW_YORK_THREE = [
  {
    categoryId: "4-6.CT.6",
    categoryTitle:
      "Compare two or more algorithms and discuss the advantages and disadvantages of each for a specific task.",
    tests: [{ testId: "92", testTitle: "test1" }],
  },
  {
    categoryId: "4-6.CT.7",
    categoryTitle:
      "Identify pieces of information that might change as a program or process runs.",
    tests: [{ testId: "93", testTitle: "test2" }],
  },
  {
    categoryId: "4-6.CT.8",
    categoryTitle:
      "Develop algorithms or programs that use repetition and conditionals for creative expression or to solve a problem.",
    tests: [{ testId: "94", testTitle: "test3" }],
  },
  {
    categoryId: "4-6.CT.9",
    categoryTitle:
      "Explain each step of an algorithm or program that includes repetition and conditionals for the purposes of debugging. ",
    tests: [{ testId: "95", testTitle: "test4" }],
  },
  {
    categoryId: "4-6.CT.10",
    categoryTitle:
      "Describe the steps taken and choices made to design and develop a solution using an iterative design process.",
    tests: [{ testId: "96", testTitle: "test5" }],
  },
];
const NEW_YORK_FOUR = [
  {
    categoryId: "7-8.CT.6",
    categoryTitle:
      "Design, compare, and refine algorithms for a specific task or within a program.",
    tests: [{ testId: "97", testTitle: "test1" }],
  },
  {
    categoryId: "7-8.CT.7",
    categoryTitle:
      "Design or remix a program that uses a variable to maintain the current value of a key piece of information.",
    tests: [{ testId: "98", testTitle: "test2" }],
  },
  {
    categoryId: "7-8.CT.8",
    categoryTitle:
      "Develop or remix a program that effectively combines one or more control structures for creative expression or to solve a problem.",
    tests: [{ testId: "99", testTitle: "test3" }],
  },
  {
    categoryId: "7-8.CT.9",
    categoryTitle:
      "Read and interpret code to predict the outcome of various programs that involve conditionals and repetition for the purposes of debugging. ",
    tests: [{ testId: "100", testTitle: "test4" }],
  },
  {
    categoryId: "7-8.CT.10",
    categoryTitle:
      "Document the iterative design process of developing a computational artifact that incorporates user feedback and preferences.",
    tests: [{ testId: "101", testTitle: "test5" }],
  },
];
const MISSOURI_ONE = [
  {
    categoryId: "K.AP.A.01",
    categoryTitle:
      "With guidance, model daily processes and follow algorithms (sets of step‐by‐step instructions) to complete tasks verbally, kinesthetically with robot devices or a programinglanguage.",
    tests: [{ testId: "102", testTitle: "test1" }],
  },
  {
    categoryId: "K.AP.V.01",
    categoryTitle:
      "With guidance, recognize that computers represent different types of data using numbers or other symbols.",
    tests: [{ testId: "103", testTitle: "test2" }],
  },
  {
    categoryId: "K.AP.C.01",
    categoryTitle:
      "With guidance, independently or collaboratively create programs to accomplish tasks using a programming language,robot device or unplugged activity that includes sequencing",
    tests: [{ testId: "104", testTitle: "test3" }],
  },
  {
    categoryId: "K.AP.PD.01",
    categoryTitle:
      "With guidance, create a grade‐level appropriate artifact to illustrate thoughts,ideas or sequence of events (step‐by‐step) manner",
    tests: [{ testId: "105", testTitle: "test4" }],
  },
  {
    categoryId: "K.AP.PD.02",
    categoryTitle:
      "Independently or with guidance give credit to ideas,creations and solutions of others while developing algorithms.",
    tests: [{ testId: "106", testTitle: "test5" }],
  },
  {
    categoryId: "K.AP.PD.03",
    categoryTitle:
      "With guidance, independently or collaboratively debug algorithms using a programming language and or unplugged activity that includes sequencing.",
    tests: [{ testId: "107", testTitle: "test6" }],
  },
  {
    categoryId: "K.AP.PD.04",
    categoryTitle:
      "Use correct terminology (beginning, middle, end) in the development of an algorithm to solve a simple problem.",
    tests: [{ testId: "108", testTitle: "test7" }],
  },
];
const MISSOURI_TWO = [
  {
    categoryId: "1.AP.A.01",
    categoryTitle:
      " With guidance, model daily processes and follow algorithms(sets of step‐by‐step instructions) to complete tasks verbally, kinesthetically, with robot devices or a programing language.",
    tests: [{ testId: "109", testTitle: "test1" }],
  },
  {
    categoryId: "1.AP.V.01",
    categoryTitle:
      "With guidance, model the way that a program accesses stored data using a variable name.",
    tests: [{ testId: "110", testTitle: "test2" }],
  },
  {
    categoryId: "1.AP.C.01",
    categoryTitle:
      "With guidance, independently or collaboratively create programs to accomplish tasks using a programming language, robot device or unplugged activity that includes sequencing and repetition",
    tests: [{ testId: "111", testTitle: "test3" }],
  },
  {
    categoryId: "1.AP.PD.01",
    categoryTitle:
      "Independently or with guidance, create a grade level appropriate document of the plan,ideas and sequence of events (step‐by‐step) manner (e.g. storymap, storyboard, sequential graphic organizer) to illustrate what the program will do.",
    tests: [{ testId: "112", testTitle: "test4" }],
  },
  {
    categoryId: "1.AP.PD.02",
    categoryTitle:
      "Independently or with guidance give credit to ideas, creations and solutions of others while writing and or developing programs.",
    tests: [{ testId: "113", testTitle: "test5" }],
  },
  {
    categoryId: "1.AP.PD.03",
    categoryTitle:
      "With guidance, independently or collaboratively debug programs using a programming language and or unplugged activity that includes sequencing and simple loops.",
    tests: [{ testId: "114", testTitle: "test6" }],
  },
  {
    categoryId: "1.AP.PD.04",
    categoryTitle:
      "Use correct terminology (first, second, third) and explain the choices made in the development of an algorithm to solve a simple problem.",
    tests: [{ testId: "115", testTitle: "test7" }],
  },
];
const MISSOURI_THREE = [
  {
    categoryId: "2.AP.A.01",
    categoryTitle:
      " With guidance, model daily processes by creating and following algorithms (sets of step‐by‐step instructions) to complete tasks verbally, kinesthetically, with robot devices or a programing language.",
    tests: [{ testId: "116", testTitle: "test1" }],
  },
  {
    categoryId: "2.AP.V.01",
    categoryTitle:
      "Model the way a computer program manipulates grade level appropriate data (e.g. print,numbers, kinesthetic movement, symbols, robot manipulatives)",
    tests: [{ testId: "117", testTitle: "test2" }],
  },
  {
    categoryId: "2.AP.C.01",
    categoryTitle:
      "With guidance, create programs using a programming language, robot device or unplugged activity that utilize sequencing and simple looping to solve a problem or express ideas both independently and collaboratively.",
    tests: [{ testId: "118", testTitle: "test3" }],
  },
  {
    categoryId: "2.AP.PD.01",
    categoryTitle:
      "Independently or with guidance, create a grade level appropriate document of the plan,ideas and sequence of events(step‐by‐ step) manner",
    tests: [{ testId: "119", testTitle: "test4" }],
  },
  {
    categoryId: "2.AP.PD.02",
    categoryTitle:
      "Give credit to ideas, information, creations and solutions of others while writing and developing programs.",
    tests: [{ testId: "120", testTitle: "test5" }],
  },
  {
    categoryId: "2.AP.PD.03",
    categoryTitle:
      "Independently and collaboratively, debug programs, which include sequencing and simple loops, to accomplish tasks as a means of creative expression or problem solving using a programming language and or unpluggedactivities.",
    tests: [{ testId: "121", testTitle: "test6" }],
  },
  {
    categoryId: "2.AP.PD.04",
    categoryTitle:
      "Use correct terminology (e.g.,debug ,program input/output code) to explain the development of an algorithm to solve a problem in an unplugged activity, hands on manipulatives or a programming language.",
    tests: [{ testId: "122", testTitle: "test7" }],
  },
];
const MISSOURI_FOUR = [
  {
    categoryId: "3.AP.A.01",
    categoryTitle:
      "Compare multiple algorithms (sets of step‐by‐step instructions) for accomplishing the same task verbally and kinesthetically, with robot devices or a programming language.",
    tests: [{ testId: "123", testTitle: "test1" }],
  },
  {
    categoryId: "3.AP.V.01",
    categoryTitle:
      "Create programs that use variables to store and modify grade level appropriate data.",
    tests: [{ testId: "124", testTitle: "test2" }],
  },
  {
    categoryId: "3.AP.C.01",
    categoryTitle:
      "Collaboratively create a program using control structures (e.g.,sequence, conditionals, interactive‐looping) to make decisions with in a program.",
    tests: [{ testId: "125", testTitle: "test3" }],
  },
  {
    categoryId: "3.AP.M.01",
    categoryTitle:
      "Decompose (breakdown) the steps needed to solve a problem in to precise sequence of instructions.",
    tests: [{ testId: "126", testTitle: "test4" }],
  },
  {
    categoryId: "3.AP.M.02",
    categoryTitle:
      "With grade appropriate complexity, modify, remix or incorporate portions of an existing program in to one's own work, to develop something new or add more advanced features.",
    tests: [{ testId: "127", testTitle: "test5" }],
  },
  {
    categoryId: "3.AP.PD.01",
    categoryTitle:
      "Use an iterative and collaborative process to plan the development of a program while solving simple problems.",
    tests: [{ testId: "128", testTitle: "test6" }],
  },
  {
    categoryId: "3.AP.PD.02",
    categoryTitle:
      "Observe intellectual property rights and give appropriate credit when creating or remixing programs.",
    tests: [{ testId: "129", testTitle: "test7" }],
  },
  {
    categoryId: "3.AP.PD.03",
    categoryTitle:
      "Analyze and debug a program that includes sequencing, repetition and variables in a programming language.",
    tests: [{ testId: "130", testTitle: "test8" }],
  },
  {
    categoryId: "3.AP.PD.04",
    categoryTitle:
      "Communicate and explain your program development using  comments, presentations and interactive demonstrations.",
    tests: [{ testId: "131", testTitle: "test9" }],
  },
];
const MISSOURI_FIVE = [
  {
    categoryId: "4.AP.A.01",
    categoryTitle:
      "Compare and simplify multiple algorithms (sets of step‐by‐step instructions) for accomplishing the same task verbally and kinesthetically, with robot devices or a programming language.",
    tests: [{ testId: "132", testTitle: "test1" }],
  },
  {
    categoryId: "4.AP.V.01",
    categoryTitle:
      "Create programs that use variables to store and modify grade level appropriate data.",
    tests: [{ testId: "133", testTitle: "test2" }],
  },
  {
    categoryId: "4.AP.C.01",
    categoryTitle:
      "Create a program using control structures (e.g.,sequence, conditionals, interactive‐looping) to solve a problem or express ideas both independently and collaboratively.",
    tests: [{ testId: "134", testTitle: "test3" }],
  },
  {
    categoryId: "4.AP.M.01",
    categoryTitle:
      "Decompose (breakdown) large problems into smaller,manageable sub-problems to facilitate the program development process.",
    tests: [{ testId: "135", testTitle: "test4" }],
  },
  {
    categoryId: "4.AP.M.02",
    categoryTitle:
      "WWith grade appropriate complexity, modify, remix or incorporate portions of an existing program in to one's own work, to develop something new or add more advanced features.",
    tests: [{ testId: "136", testTitle: "test5" }],
  },
  {
    categoryId: "4.AP.PD.01",
    categoryTitle:
      "Use an iterative and collaborative process to plan the development of a program that includes userpreferences while solving simple problems.",
    tests: [{ testId: "137", testTitle: "test6" }],
  },
  {
    categoryId: "4.AP.PD.02",
    categoryTitle:
      "Observe intellectual property rights and give appropriate credit when creating or remixing programs.",
    tests: [{ testId: "138", testTitle: "test7" }],
  },
  {
    categoryId: "4.AP.PD.03",
    categoryTitle:
      "Analyze, create and debug a program that includes sequencing, repetition,conditionals and variables in a programming language.",
    tests: [{ testId: "139", testTitle: "test8" }],
  },
  {
    categoryId: "4.AP.PD.04",
    categoryTitle:
      "Communicate and explain your program development using comments,presentations and interactive demonstrations.",
    tests: [{ testId: "140", testTitle: "test9" }],
  },
];
const MISSOURI_SIX = [
  {
    categoryId: "5.AP.A.01",
    categoryTitle:
      "Compare and simplify multiple algorithms (sets of step‐by step instructions)for accomplishing the same task verbally and kinesthetically, with robot devices or a programming language, then determine which is the most efficient.",
    tests: [{ testId: "141", testTitle: "test1" }],
  },
  {
    categoryId: "5.AP.V.01",
    categoryTitle:
      "Create programs that use variables to store and modify grade level appropriate data.",
    tests: [{ testId: "142", testTitle: "test2" }],
  },
  {
    categoryId: "5.AP.C.01",
    categoryTitle:
      "Create a programusing control structures (e.g.,sequence, conditionals, interactive‐looping), event-handlers and variables to solve a problem or express ideas both independently and collaboratively.",
    tests: [{ testId: "143", testTitle: "test3" }],
  },
  {
    categoryId: "5.AP.M.01",
    categoryTitle:
      "Decompose (breakdown) large problems into smaller, manageable sub-problems and then into a precise sequence of instructions.",
    tests: [{ testId: "144", testTitle: "test4" }],
  },
  {
    categoryId: "5.AP.M.02",
    categoryTitle:
      "With grade appropriate complexity, modify, remix or incorporate portions of an existing program in to one's own work, to develop something new or add more advanced features.",
    tests: [{ testId: "145", testTitle: "test5" }],
  },
  {
    categoryId: "5.AP.PD.01",
    categoryTitle:
      "Use an iterative and collaborative process to plan the development of a program that includes other perspectives and user preferences while solving simple problems.",
    tests: [{ testId: "146", testTitle: "test6" }],
  },
  {
    categoryId: "5.AP.PD.02",
    categoryTitle:
      "Observe intellectual property rights and give appropriate credit when creating or remixing programs.",
    tests: [{ testId: "147", testTitle: "test7" }],
  },
  {
    categoryId: "5.AP.PD.03",
    categoryTitle:
      "Analyze, examine, create and debug a program that includes sequencing, repetition,conditionals and variables in a programming language.",
    tests: [{ testId: "148", testTitle: "test8" }],
  },
  {
    categoryId: "5.AP.PD.04",
    categoryTitle:
      "Communicate and explain your program development using comments, presentations and interactive demonstrations.",
    tests: [{ testId: "149", testTitle: "test9" }],
  },
];
const MISSOURI_SEVEN = [
  {
    categoryId: "6-8.AP.A.01",
    categoryTitle:
      "Design algorithms with flowcharts and or pseudocode to show solutions to complex problems.",
    tests: [{ testId: "150", testTitle: "test1" }],
  },
  {
    categoryId: "6-8.AP.V.01",
    categoryTitle:
      "Create clearly named variables to store and manipulate information.",
    tests: [{ testId: "151", testTitle: "test2" }],
  },
  {
    categoryId: "6-8.AP.C.01",
    categoryTitle:
      "Design and develop combinations of control structures, nested loops and compound conditionals.",
    tests: [{ testId: "152", testTitle: "test3" }],
  },
  {
    categoryId: "6-8.AP.M.01",
    categoryTitle:
      "Decompose problems and sub-problems into parts to facilitate the design, implementation and review of programs.",
    tests: [{ testId: "153", testTitle: "test4" }],
  },
  {
    categoryId: "6-8.AP.M.02",
    categoryTitle:
      "Create procedures with parameters to organize code and to make it easier to reuse.",
    tests: [{ testId: "154", testTitle: "test5" }],
  },
  {
    categoryId: "6-8.AP.PD.01",
    categoryTitle:
      "Use flowcharts and or pseudocode to solve problems using algorithms.",
    tests: [{ testId: "155", testTitle: "test6" }],
  },
  {
    categoryId: "6-8.AP.PD.02",
    categoryTitle:
      "Use feedback from team members and users to refine solutions to meet user needs.",
    tests: [{ testId: "156", testTitle: "test7" }],
  },
  {
    categoryId: "6-8.AP.PD.03",
    categoryTitle:
      "Give proper attribution to code,media,etc.that is used in their programs.",
    tests: [{ testId: "157", testTitle: "test8" }],
  },
  {
    categoryId: "6-8.AP.PD.04",
    categoryTitle: "Test and refine programs using arange of test cases.",
    tests: [{ testId: "158", testTitle: "test9" }],
  },
  {
    categoryId: "6-8.AP.PD.05",
    categoryTitle:
      "Manage project tasks and timelines when collaboratively developing computational artifacts.",
    tests: [{ testId: "159", testTitle: "test10" }],
  },
];

export const allSKills: SkillDetails[] = [
  ...CTSA_ONE,
  ...CTSA_TWO,
  ...CTSA_THREE,
  ...KANSAS_ONE,
  ...KANSAS_TWO,
  ...KANSAS_THREE,
  ...KANSAS_FOUR,
  ...KANSAS_FIVE,
  ...KANSAS_SIX,
  ...KANSAS_SEVEN,
  ...NEW_YORK_ONE,
  ...NEW_YORK_TWO,
  ...NEW_YORK_THREE,
  ...NEW_YORK_FOUR,
  ...MISSOURI_ONE,
  ...MISSOURI_TWO,
  ...MISSOURI_THREE,
  ...MISSOURI_FOUR,
  ...MISSOURI_FIVE,
  ...MISSOURI_SIX,
  ...MISSOURI_SEVEN,
];

const initialState: SkillDetails[] = CTSA_ONE;

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    updateSkills: (
      state: SkillDetails[],
      action: PayloadAction<{
        skillType: string;
        grade: string;
      }>
    ) => {
      const grade = action.payload.grade;
      const skillType = action.payload.skillType;
      switch (skillType) {
        case "CTSA":
          if (
            grade === "Kindergarden" ||
            grade === "Grade 1" ||
            grade === "Grade 2"
          ) {
            return CTSA_ONE;
          } else if (
            grade === "Grade 3" ||
            grade === "Grade 4" ||
            grade === "Grade 5"
          ) {
            return CTSA_TWO;
          } else if (
            grade === "Grade 6" ||
            grade === "Grade 7" ||
            grade === "Grade 8"
          ) {
            return CTSA_THREE;
          }
          break;
        case "Kansas":
          if (grade === "Kindergarden") {
            return KANSAS_ONE;
          } else if (grade === "Grade 1") {
            return KANSAS_TWO;
          } else if (grade === "Grade 2") {
            return KANSAS_THREE;
          } else if (grade === "Grade 3") {
            return KANSAS_FOUR;
          } else if (grade === "Grade 4") {
            return KANSAS_FIVE;
          } else if (grade === "Grade 5") {
            return KANSAS_SIX;
          } else if (
            grade === "Grade 6" ||
            grade === "Grade 7" ||
            grade === "Grade 8"
          ) {
            return KANSAS_SEVEN;
          }
          break;
        case "New York":
          if (grade === "Kindergarden" || grade === "Grade 1") {
            return NEW_YORK_ONE;
          } else if (grade === "Grade 2" || grade === "Grade 3") {
            return NEW_YORK_TWO;
          } else if (
            grade === "Grade 4" ||
            grade === "Grade 5" ||
            grade === "Grade 6"
          ) {
            return NEW_YORK_THREE;
          } else if (grade === "Grade 7" || grade === "Grade 8") {
            return NEW_YORK_FOUR;
          }
          break;
        case "Missouri":
          if (grade === "Kindergarden") {
            return MISSOURI_ONE;
          } else if (grade === "Grade 1") {
            return MISSOURI_TWO;
          } else if (grade === "Grade 2") {
            return MISSOURI_THREE;
          } else if (grade === "Grade 3") {
            return MISSOURI_FOUR;
          } else if (grade === "Grade 4") {
            return MISSOURI_FIVE;
          } else if (grade === "Grade 5") {
            return MISSOURI_SIX;
          } else if (
            grade === "Grade 6" ||
            grade === "Grade 7" ||
            grade === "Grade 8"
          ) {
            return MISSOURI_SEVEN;
          }
          break;
        default:
          break;
      }
    },
    searchSkills: (
      state: SkillDetails[],
      action: PayloadAction<{
        params: string;
        grade: string;
        skillType: string;
      }>
    ) => {
      let mainState: SkillDetails[] = CTSA_ONE;
      const grade = action.payload.grade;
      const skillType = action.payload.skillType;
      switch (skillType) {
        case "CTSA":
          if (
            grade === "Kindergarden" ||
            grade === "Grade 1" ||
            grade === "Grade 2"
          ) {
            mainState = CTSA_ONE;
          } else if (
            grade === "Grade 3" ||
            grade === "Grade 4" ||
            grade === "Grade 5"
          ) {
            mainState = CTSA_TWO;
          } else if (
            grade === "Grade 6" ||
            grade === "Grade 7" ||
            grade === "Grade 8"
          ) {
            mainState = CTSA_THREE;
          }
          break;
        case "Kansas":
          if (grade === "Kindergarden") {
            mainState = KANSAS_ONE;
          } else if (grade === "Grade 1") {
            mainState = KANSAS_TWO;
          } else if (grade === "Grade 2") {
            mainState = KANSAS_THREE;
          } else if (grade === "Grade 3") {
            mainState = KANSAS_FOUR;
          } else if (grade === "Grade 4") {
            mainState = KANSAS_FIVE;
          } else if (grade === "Grade 5") {
            mainState = KANSAS_SIX;
          } else if (
            grade === "Grade 6" ||
            grade === "Grade 7" ||
            grade === "Grade 8"
          ) {
            mainState = KANSAS_SEVEN;
          }
          break;
        case "New York":
          if (grade === "Kindergarden" || grade === "Grade 1") {
            mainState = NEW_YORK_ONE;
          } else if (grade === "Grade 2" || grade === "Grade 3") {
            mainState = NEW_YORK_TWO;
          } else if (
            grade === "Grade 4" ||
            grade === "Grade 5" ||
            grade === "Grade 6"
          ) {
            mainState = NEW_YORK_THREE;
          } else if (grade === "Grade 7" || grade === "Grade 8") {
            mainState = NEW_YORK_FOUR;
          }
          break;
        case "Missouri":
          if (grade === "Kindergarden") {
            mainState = MISSOURI_ONE;
          } else if (grade === "Grade 1") {
            mainState = MISSOURI_TWO;
          } else if (grade === "Grade 2") {
            mainState = MISSOURI_THREE;
          } else if (grade === "Grade 3") {
            mainState = MISSOURI_FOUR;
          } else if (grade === "Grade 4") {
            mainState = MISSOURI_FIVE;
          } else if (grade === "Grade 5") {
            mainState = MISSOURI_SIX;
          } else if (
            grade === "Grade 6" ||
            grade === "Grade 7" ||
            grade === "Grade 8"
          ) {
            mainState = MISSOURI_SEVEN;
          }
          break;
        default:
          break;
      }
      const filteredState: SkillDetails[] = mainState?.filter((item) => {
        let testNames = "";
        item.tests.forEach((test) => {
          testNames = `${testNames} ${test.testTitle}`;
        });
        return (
          item.categoryTitle.includes(action.payload.params) ||
          item.categoryTitle.toLowerCase().includes(action.payload.params) ||
          testNames.includes(action.payload.params) ||
          testNames.toLowerCase().includes(action.payload.params)
        );
      });
      return filteredState;
    },
  },
});

export default skillsSlice.reducer;
export const { updateSkills, searchSkills } = skillsSlice.actions;
