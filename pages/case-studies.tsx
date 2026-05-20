import React from "react";
import Head from "next/head";
import Navbar from "@/components/navbar/home/Navbar";
import Footer from "@/components/home/new-home/footer";

const PILLAR_TAGS = {
  college: { label: "College Access & Completion", color: "bg-blue-200 text-blue-900" },
  workforce: { label: "Workforce & Career Development", color: "bg-emerald-200 text-emerald-900" },
  economic: { label: "Economic Mobility", color: "bg-amber-200 text-amber-900" },
};

type PillarKey = keyof typeof PILLAR_TAGS;

interface CaseStudyCardProps {
  eyebrow: string;
  title: string;
  pillars: PillarKey[];
  before: string;
  intervention: string;
  after: string;
}

const CaseStudyCard = ({
  eyebrow, title, pillars, before, intervention, after,
}: CaseStudyCardProps) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
    <p className="text-sm text-gray-500 font-semibold mb-1">{eyebrow}</p>
    <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>

    <div className="flex flex-wrap gap-2 mb-6">
      {pillars.map((p) => (
        <span key={p} className={`text-xs font-bold px-3 py-1 rounded-full ${PILLAR_TAGS[p].color}`}>
          {PILLAR_TAGS[p].label}
        </span>
      ))}
    </div>

    <div className="grid md:grid-cols-3 gap-4 mb-8">
      {[
        { heading: "The challenge", body: before, border: "border-red-500" },
        { heading: "What CodeAlgo did", body: intervention, border: "border-blue-600" },
        { heading: "What changed", body: after, border: "border-emerald-600" },
      ].map(({ heading, body, border }) => (
        <div key={heading} className={`border-l-4 ${border} bg-gray-50 pl-4 py-3 pr-3 rounded-r-lg`}>
          <p className="text-xs font-extrabold uppercase tracking-wide text-gray-400 mb-1">{heading}</p>
          <p className="text-sm text-gray-700 leading-relaxed">{body}</p>
        </div>
      ))}
    </div>
  </div>
);

const caseStudies: CaseStudyCardProps[] = [
  {
    eyebrow: "Kansas City, 2024–2026",
    title: "Closing the math gap: the gateway to college",
    pillars: ["college"],
    before:
      "68% of participating students were below grade-level in math, the single greatest barrier to college enrollment and completion in under-resourced schools.",
    intervention:
      "Every single school currently using the CodeAlgo platform has seen an above national average increase in math, with at least 70% of their students showing measurable grade-level growth through AI-driven coding challenges aligned to each student's grade level.",
    after:
      "Students showed measurable grade-level math improvement within one semester, increasing eligibility for college-track coursework and dual-enrollment programs.",
  },
  {
    eyebrow: "Internship Cohort — 2025 to current",
    title: "From AI literacy to a living wage career path",
    pillars: ["college", "workforce"],
    before:
      "Students from Black, Latino, and low-income families had limited exposure to coding, AI, or professional tech environments, blocking access to high-wage career pathways.",
    intervention:
      "CodeAlgo's curriculum combined AI literacy, real-world coding projects, and a structured internship pipeline connecting students directly to employers.",
    after:
      "Graduates entered internships and entry-level tech roles, establishing a clear, repeatable pathway from classroom to career, directly supporting equitable living wages.",
  },
];

interface StatCardProps {
  value: string;
  label: string;
  source: string;
  isLast?: boolean;
}

const StatCard = ({ value, label, source, isLast }: StatCardProps) => (
  <div
    className={`flex flex-col justify-between px-8 py-8 ${
      !isLast ? "border-b sm:border-b-0 sm:border-r border-gray-200" : ""
    }`}
  >
    <div>
      <p className="text-5xl sm:text-6xl font-black text-mainColor leading-none mb-4">
        {value}
      </p>
      <p className="text-sm text-gray-700 leading-relaxed font-medium">{label}</p>
    </div>
    <p className="mt-6 text-xs text-gray-400 font-medium border-t border-gray-100 pt-4">
      Source: {source}
    </p>
  </div>
);

const CaseStudies = () => (
  <>
    <Head>
      <title>Impact & Case Studies | CodeAlgo Academy</title>
      <meta
        name="description"
        content="Real outcomes from CodeAlgo's programs — math, AI literacy, coding, and workforce development for Kansas City students."
      />
    </Head>

    <main className="bg-white min-h-screen font-thabit">
      <Navbar />

      {/* Hero */}
            <section className="bg-mainBlack py-14 px-4 sm:px-6 text-center">
        <p className="text-base font-bold uppercase tracking-widest text-amber-400 mb-3">
          Equitable Economic Mobility for Kansas City
        </p>
        <h1 className="text-2xl md:text-5xl font-extrabold text-white mb-4">
          Real impact. Measurable change.
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
          Greater Kansas City will become a national model for equitable economic mobility.
          Here is CodeAlgo's role in making that happen — for Black, Latino, and low-income
          students through math, AI literacy, and workforce development.
        </p>
        <div className="mt-10 grid grid-cols-3 max-w-4xl mx-auto gap-6">
          {[
            { value: "3%", label: "Key pillars addressed" },
            { value: "Math & College", label: "Primary barrier removed" },
            { value: "Internships", label: "Direct workforce pathway" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-black text-amber-400">{value}</p>
              <p className="text-xs text-gray-300 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-y border-gray-200 shadow-sm max-w-4xl mx-auto py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3">
          <StatCard
            value="+16,000"
            label="Coding problems solved by students on the CodeAlgo platform to date."
            source="CodeAlgo Platform Data"
          />
          <StatCard
            value="70%+"
            label="Of students across every CodeAlgo partner school are showing above national average math growth."
            source="Partner School Outcomes, 2024–2026"
          />
          <StatCard
            value="500+"
            label="Students actively on a college or high-wage career track through CodeAlgo programs."
            source="CodeAlgo Program Records"
            isLast
          />
        </div>
      </section>

      {/* Case Studies */}
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        {caseStudies.map((cs) => (
          <CaseStudyCard key={cs.title} {...cs} />
        ))}
      </section>

      {/* Economic case */}
      <section className="bg-mainBlack py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-extrabold uppercase tracking-widest text-amber-400 mb-2">
            The economic case
          </p>
          <h2 className="text-3xl font-extrabold text-white mb-8">
            What CodeAlgo's growth means for Kansas City
          </h2>

          <div className="bg-white rounded-2xl border border-gray-200 p-7 mb-8">
            <h3 className="font-bold text-lg text-gray-900 mb-3">
              Generational economic mobility
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Every student who moves from below-grade-level math to a tech internship
              represents a family moving toward financial independence. At scale, this
              directly supports the vision of dismantling systemic barriers to prosperity
              across Greater Kansas City.
            </p>
          </div>

          <div className="bg-mainColor rounded-2xl p-8">
            <p className="text-xl font-extrabold text-white mb-2">The return on investment</p>
            <p className="text-gray-100 leading-relaxed">
              An investment in CodeAlgo is an investment in Kansas City's economy. Every
              student placed in a high-wage career adds to the local tax base, supports
              their family, and sets the next generation on the path to prosperity — the
              exact outcome this city's future calls for.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  </>
);

export default CaseStudies;