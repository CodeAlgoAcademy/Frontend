import Link from "next/link";
import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter, BsTwitterX, BsYoutube } from "react-icons/bs";

const links = [
   {
      header: "Resources",
      sublinks: [
         {
            title: "Parents Resource",
            href: "/signup/parent",
         },
         {
            title: "Teachers Resource",
            href: "/signup/teacher",
         },
         {
            title: "Corporate Partnership",
            href: "https://forms.monday.com/forms/ef8bc548d5f5846d9f5c23baa615b924?r=use1",
         },
         {
            title: "Professional Development",
            href: "/dev-forum",
         },
         {
            title: "Pricing",
            href: "/pricing",
         },
      ],
   },

   {
      header: "Support",
      sublinks: [
         {
            title: "Support Center",
            href: "/contact",
         },
         {
            title: "FAQs",
            href: "/faq",
         },
         {
            title: "Getting Set Up",
            href: "/signup",
         },
      ],
   },

   {
      header: "Legal",
      sublinks: [
         {
            title: "Terms",
            href: "/privacy-policy",
         },
         {
            title: "Privacy",
            href: "/privacy-policy",
         },
         {
            title: "Kids & Online Safety",
            href: "/privacy-policy",
         },
      ],
   },

   {
      header: "Codealgo",
      sublinks: [
         {
            title: "About Us",
            href: "/about-us",
         },
         {
            title: "Press",
            href: "/press",
         },
         {
            title: "Blog",
            href: "/blog",
         },
         {
            title: "Contact Us",
            href: "/contact",
         },
      ],
   },
];

export const socials = [
   { link: "https://twitter.com/stcodealgo", icon: <BsTwitterX /> },
   { link: "https://linkedin.com/company/codealgo", icon: <BsLinkedin /> },
   { link: "https://facebook.com/stcodealgo", icon: <BsFacebook /> },
   { link: "https://instagram.com/stcodealgo", icon: <BsInstagram /> },
];

const Footer = () => {
   return (
      <footer className="min-h-[150px] bg-mainBlack p-12 font-thabit text-white max-md:px-6">
         <div className="grid grid-cols-1 gap-8 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {links.map((link, index) => {
               return (
                  <div key={index}>
                     <p className="mb-2 font-thabitBold text-[.9rem] md:mb-8">{link.header}</p>

                     <ul className="space-y-2">
                        {link.sublinks.map((sublink, index) => {
                           return (
                              <li key={index} className="text-white">
                                 <Link href={sublink.href}>{sublink.title}</Link>
                              </li>
                           );
                        })}
                     </ul>
                  </div>
               );
            })}
         </div>

         <div className="mt-20 flex items-center justify-between gap-4 max-md:flex-col-reverse max-md:items-start">
            <div className="flex items-end gap-2">
               {socials.map((social, index) => {
                  return (
                     <a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-[17px] text-black"
                        key={index}
                     >
                        {social.icon}
                     </a>
                  );
               })}
            </div>

            <p className="text-[.9rem]">Copyright &copy; 2024 CodeAlgo</p>

            <p className="text-[.9rem] font-semibold">720 Main St, Kansas City MO, 64105</p>
         </div>
      </footer>
   );
};

export default Footer;
