import Footer, { socials } from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import { codingLanguages, fortune10Companies, salaryByRegion, thingsYouCanCreate, whatTheyDo } from "public/learnmore.data";
import React from 'react';
import { FaCode, FaLaptopCode } from "react-icons/fa";

export default function index() {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-thabit">What's All This Coding About?</h1>
          <p className="text-xl text-gray-600 font-thabit">Discover how coding leads to great jobs at big companies</p>
        </div>

        {/* What is Coding Section */}
        <section className="mb-16 bg-blue-50 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 flex justify-center">
              <FaCode className="text-blue-500 text-8xl" />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl text-gray-800 mb-4 font-thabit">Coding in Simple Terms</h2>
              <p className="text-lg text-gray-700 mb-4 font-thabit">
                Coding is like giving your computer step-by-step instructions. Just like you'd write down a recipe for baking cookies, coders write "recipes" that tell computers what to do.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-blue-600 mb-2 font-thabit">Common Coding Languages</h3>
                  <ul className="list-disc pl-5">
                    {codingLanguages.map((lang, index) => (
                      <li key={index} className="font-thabit">{lang}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-blue-600 mb-2 font-thabit">Cool Things You Can Build</h3>
                  <ul className="list-disc pl-5">
                    {thingsYouCanCreate.map((item, index) => (
                      <li key={index} className="font-thabit">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is Software Engineering Section */}
      <section className="mb-16 bg-green-50 p-6 rounded-lg">
  <div className="flex flex-col md:flex-row-reverse items-center gap-8">
    <div className="md:w-1/3 flex justify-center">
      <FaLaptopCode className="text-green-600 text-8xl" />
    </div>
    <div className="md:w-2/3">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 font-thabit">
        What Is Software Engineering?
      </h2>
      <p className="text-lg text-gray-700 mb-4 font-thabit">
        Software engineers are people who build things on computers, just like builders work on houses, 
        but instead of bricks, they use code. They help create apps, websites, and programs we use every day. 
        It's not just typing code, they also plan, test, and work with others to make sure everything works well.
      </p>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h3 className="font-bold text-green-600 mb-2 font-thabit">
          Different Types of Software Engineers
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li className="font-thabit"><strong>Frontend Engineers</strong> – They build what you see and click on, in apps and websites.</li>
          <li className="font-thabit"><strong>Backend Engineers</strong> – They make sure everything works behind the scenes (like saving your data).</li>
          <li className="font-thabit"><strong>Mobile Engineers</strong> – They build apps for your phone or tablet.</li>
          <li className="font-thabit"><strong>DevOps Engineers</strong> – They keep apps running fast and smooth online.</li>
          <li className="font-thabit"><strong>Data Engineers</strong> – They help collect and organize information so apps can use it.</li>
        </ul>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-bold text-green-600 mb-2 font-thabit">
          What Do They Really Do?
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          {whatTheyDo.map((task, index) => (
            <li key={index} className="font-thabit">{task}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</section>


        {/* Salary Insights Section */}
        <section className="mb-16 bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center font-thabit">Big Companies That Hire Coders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left font-thabit">#</th>
                  <th className="py-3 px-4 text-left font-thabit">Company</th>
                  <th className="py-3 px-4 text-left font-thabit">Industry</th>
                  <th className="py-3 px-4 text-left font-thabit">Starting Salary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {fortune10Companies.map((company, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{company.rank}</td>
                    <td className="py-3 px-4 font-medium font-thabit">{company.name}</td>
                    <td className="py-3 px-4 font-thabit">{company.industry}</td>
                    <td className="py-3 px-4 font-thabit">{company.salary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4 font-thabit">*Salary depends on the job and where you live</p>
        </section>
<section className="bg-blue-50 p-6 rounded-lg">
  <div className="flex flex-col md:flex-row items-center gap-8">
    <div className="md:w-1/2">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 font-thabit">What Beginners in Coding Earn</h2>
      <p className="text-lg text-gray-700 mb-4 font-thabit">
        Even starting out, coding jobs pay very well. What you earn depends on:
      </p>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-bold text-blue-500 mb-2 font-thabit">What Affects Pay</h3>
        <ul className="list-disc pl-5 space-y-2 font-thabit">
          <li><strong>Where you work:</strong> Big tech cities pay the most</li>
          <li><strong>Schooling:</strong> More education can mean higher pay</li>
          <li><strong>Special skills:</strong> Some computer skills earn extra</li>
          <li><strong>Company type:</strong> Big companies often pay more</li>
        </ul>
      </div>
    </div>
    <div className="md:w-1/2">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-center font-thabit">Typical Starting Salaries</h3>
        <div className="space-y-4">
          {salaryByRegion.map((region, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1 font-thabit">
                <span>{region.area}</span>
                <span>{region.salary}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full" 
                  style={{ width: `${region.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
      </div>
      <Footer />
    </>
  );
}
