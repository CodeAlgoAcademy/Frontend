import Link from 'next/link';
import React, { useState } from 'react';
import { links } from './Links';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const NavLinks = () => {
  const [heading, setHeading] = useState('');

  const active = (name: string) => {
    if (heading !== name) {
      setHeading(name);
    } else {
      setHeading('');
    }
  };

  return (
    <>
      {links.map((link, index) => (
        <div key={index}>
          <div className="px-3 text-left md:cursor-pointer group">
            <h1
              className="py-7 text-base font-semibold opacity-80 hover:opacity-70 flex justify-between items-center md:pr-0 pr-5 group"
              onClick={() => active(link.name)}
            >
              {link.name}
              <span className="text-xl md:hidden inline">
                {heading === link.name ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </h1>
            {link.subMenu && (
              <div>
                <div className="z-50 absolute top-16 hidden group-hover:md:block hover:md:block">
                  <div className="py-3">
                    <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45"></div>
                  </div>
                  <div className="bg-white p-1 grid grid-cols-1 gap-1">
                    {link.sublinks.map((slink, index) => (
                      <li className="text-sm p-3 hover:bg-slate-100 text-gray-600" key={index}>
                        <Link href={slink.link} className="hover:text-primary">
                          {slink.name}
                        </Link>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className={`
                        ${heading === link.name ? 'md:hidden' : 'hidden'}
                    `}
          >
            {/* sublinks */}
            {link.sublinks.map((slinks, index) => (
              <li key={index} className="py-3 pl-14 hover:bg-slate-100">
                <Link href={slinks.link}>{slinks.name}</Link>
              </li>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavLinks;
