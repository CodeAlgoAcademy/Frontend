import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import Hero from "@/components/home/new-home/hero";
import WhatWeBuilt from "@/components/home/new-home/what-we-built";
import VoiceOfOurCommunity from "@/components/home/new-home/voice-of-our-community";
import GetStarted from "@/components/home/new-home/get-started";
import CodeToSuccess from "@/components/home/new-home/code-to-success";
import AsSeenIs from "@/components/home/new-home/as-seen-in";
import Footer from "@/components/home/new-home/footer";
import { WinterBanner } from "@/components/home/new-home/winter-banner";
import ValuePropositions from "@/components/home/new-home/ValuePropositions";
import Navbar from "@/components/navbar/home/Navbar";
import HomepageContent from "@/components/home/new-home/HomepageContent";
import HomepageExpandedContent from "@/components/home/new-home/HomepageExpandedContent";
import BlackHistoryHero from "@/components/home/new-home/BlackHistoryHero";

// ── Schema definitions ──────────────────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CodeAlgo Academy",
  url: "https://www.codealgo.com",
  logo: "https://www.codealgo.com/assets/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "support@codealgo.com",
  },
  sameAs: [
    "https://www.facebook.com/codealgo",
    "https://www.instagram.com/codealgo",
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "CodeAlgo Academy",
  description: "Kids coding classes online for ages 5–14. Learn Python, JavaScript & more.",
  url: "https://www.codealgo.com",
  logo: "https://www.codealgo.com/assets/logo.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kansas City",
    addressRegion: "MO",
    addressCountry: "US",
  },
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Kids Coding Courses",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Course",
        name: "Python for Kids",
        description: "Learn Python programming through fun, game-based projects.",
        url: "https://www.codealgo.com/courses/python-for-kids",
        provider: { "@type": "Organization", name: "CodeAlgo Academy" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Course",
        name: "JavaScript for Beginners",
        description: "Build interactive web projects with JavaScript.",
        url: "https://www.codealgo.com/courses/javascript-for-beginners",
        provider: { "@type": "Organization", name: "CodeAlgo Academy" },
      },
    },
  ],
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "CodeAlgo Academy Coding Classes",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "200",
  },
};

const Home: NextPage = () => {
  return (
    <div className="relative bg-white" suppressHydrationWarning>
      <Head>
        <title>Kids Coding Classes Online | Learn Programming for Children | CodeAlgo Academy</title>
        <meta
          name="description"
          content="CodeAlgo Academy teaches kids ages 5-14 to code through fun, game-based lessons. Build real projects, track progress, and learn Python & more. Try free today!"
        />
        <meta
          name="google-site-verification"
          content="eGB3Olxnsy0kXPD_3EoaI1Fzl7xsQVK4R1WxbBSCrFI"
        />
        <link rel="canonical" href="https://www.codealgo.com" />

        {/* ── Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      </Head>
      <Navbar />
      <WinterBanner />
      <BlackHistoryHero />
      <ValuePropositions />
      <WhatWeBuilt />
      <GetStarted />
      <CodeToSuccess />
      <VoiceOfOurCommunity />
      <HomepageContent />
      <HomepageExpandedContent />
      <AsSeenIs />
      <Footer />
    </div>
  );
};

export default Home;