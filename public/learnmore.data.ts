import { FaCode, FaLaptopCode, FaChartLine, FaUniversity } from 'react-icons/fa';

export const careersData = [
  {
    title: "Frontend Developer",
    description: "Builds the parts of websites and apps that you can see and click on.",
    salary: "$75,000 - $110,000",
    icon: FaCode
  },
  {
    title: "Backend Developer",
    description: "Works on the hidden parts that make websites function, like remembering your login.",
    salary: "$85,000 - $120,000",
    icon: FaLaptopCode
  },
  {
    title: "Full Stack Developer",
    description: "Does both frontend and backend work - handles everything from what you see to how it works.",
    salary: "$90,000 - $130,000",
    icon: FaUniversity
  },
  {
    title: "DevOps Engineer",
    description: "Helps get apps online and keeps them running without problems.",
    salary: "$95,000 - $140,000",
    icon: FaChartLine 
  },
  {
    title: "Data Engineer",
    description: "Organizes information so companies can understand it better.",
    salary: "$100,000 - $145,000",
    icon: FaChartLine 
  },
  {
    title: "Mobile Developer",
    description: "Makes apps for your smartphone or tablet.",
    salary: "$80,000 - $125,000",
    icon: FaCode
  }
];

export const fortune10Companies = [
  { rank: 1, name: "Walmart", industry: "Retail", salary: "$70,000 - $90,000" },
  { rank: 2, name: "Amazon", industry: "E-commerce / Cloud", salary: "$120,000 - $145,000" },
  { rank: 3, name: "Apple", industry: "Technology", salary: "$125,000 - $150,000" },
  { rank: 4, name: "UnitedHealth Group", industry: "Healthcare", salary: "$100,000 - $120,000" },
  { rank: 5, name: "Berkshire Hathaway", industry: "Insurance / Conglomerate", salary: "$90,000 - $110,000" },
  { rank: 6, name: "CVS Health", industry: "Healthcare / Pharmacy", salary: "$90,000 - $110,000" },
  { rank: 7, name: "ExxonMobil", industry: "Energy / Petroleum", salary: "$95,000 - $115,000" },
  { rank: 8, name: "Alphabet (Google)", industry: "Internet Services", salary: "$130,000 - $155,000" },
  { rank: 9, name: "McKesson", industry: "Healthcare Distribution", salary: "$85,000 - $105,000" },
  { rank: 10, name: "Cencora", industry: "Healthcare Wholesalers", salary: "$85,000 - $105,000" },
];


export const salaryByRegion = [
  { area: "Silicon Valley", salary: "$135,000", percentage: 100 },
  { area: "New York City", salary: "$125,000", percentage: 93 },
  { area: "Seattle", salary: "$120,000", percentage: 89 },
  { area: "Boston", salary: "$115,000", percentage: 85 },
  { area: "Austin", salary: "$110,000", percentage: 82 },
  { area: "Chicago", salary: "$105,000", percentage: 78 },
  { area: "National Average", salary: "$100,000", percentage: 74 }
];

export const codingLanguages = [
  'JavaScript - for making websites interactive',
  'Python - easiest to learn first',
  'Java - runs many computer programs',
  'C++ - powers video games',
  'Swift - makes iPhone apps',
];

export const thingsYouCanCreate = [
  'Mobile apps like TikTok or Instagram',
  'Websites like Facebook or Wikipedia',
  'Video games like Minecraft',
  'Smart programs like Siri or Alexa',
  'Systems to store information safely',
];

export const whatTheyDo = [
  'Think through problems and find simple solutions',
  'Write easy-to-understand code',
  'Work with teammates',
  'Test apps to make sure they work',
  'Make programs run faster',
  'Keep apps safe from hackers',
];
