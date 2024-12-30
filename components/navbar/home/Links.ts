export interface NavbarLink {
   name: string;
   subMenu?: boolean;
   sublinks?: { name: string; link: string }[];
   route?: string;
}

export const links: NavbarLink[] = [
   {
      name: "About",
      subMenu: true,
      sublinks: [
         { name: "About Us", link: "/about-us" },
         { name: "Press", link: "/press" },
         { name: "Blog", link: "/blog" },
         { name: "Contact Us", link: "/contact" },
      ],
   },

   {
      name: "Parents",
      subMenu: true,
      sublinks: [
         // { name: "Parent's Page", link: '/parents' },
         // { name: 'FAQ', link: '/parents/faq' },
         { name: "Login", link: "/login/parent" },
      ],
   },
   {
      name: "Educators",
      subMenu: true,
      sublinks: [
         // { name: "Teacher's Page", link: '/teachers' },
         // { name: 'Resources', link: '/teachers/resources' },
         { name: "Login", link: "/login/teacher" },
      ],
   },
   {
      name: "Pricing",
      route: "/pricing",
   },
];
