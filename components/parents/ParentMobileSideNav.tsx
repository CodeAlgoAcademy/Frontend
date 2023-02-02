import React from 'react';
import NavButton from './NavButton';

const linkDetails = [
   [
      {title: "Main Dashboard",image: "Dashboard.svg",name: "",}
   ],
   [
      {title: "Messages",image: "message.svg",name: "messages"},
   ],
   [
      {title: "Billing",image: "Billing.svg",name: "billing"},
      {title: "Student Accounts",image: "people.svg",name: "student"},
   ],
   [
      {title: "Screen Time",image: "screen-time.svg",name: "screen-time"},
      {title: "Multiplayer",image: "game.svg",name: "multiplayer"},
   ],
];

const ParentMobileSideNav = () => {
   return (
      <div className='py-2 mr-[3%] min-w-[40px] flex xl:hidden divide-y sticky top-0 h-full flex-col gap-4 first:pt-0'>
         {
            linkDetails.map((links,index) => {
               return (
                  <div className='flex gap-3 pt-4 flex-col justify-between' key={`${index}`}>
                     {
                        links.map(({title,name,image}) => {
                           return (
                              <NavButton key={title} title={title} image={image} name={name} isIcon={true} />
                           );
                        })
                     }
                  </div>
               );
            })
         }
      </div>
   );
};

export default ParentMobileSideNav;