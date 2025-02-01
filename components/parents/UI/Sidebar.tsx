import { SlOrganization } from "react-icons/sl";
import NavButton from "./NavButton";
import { GiHelp } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import { DEFAULT_SUPPORT } from "constants/support.const";

interface Props {
   onClose(): void;
   isOpen: boolean;
}

export default function ParentSidebar({ onClose, isOpen }: Props) {
   return (
      <aside
         className={`${
            isOpen ? "translate-x-0" : "translate-x-[100%]"
         } fixed top-0 right-0 z-[5] h-full max-h-full w-full overflow-y-scroll bg-white p-2 transition-all duration-500 md:left-0 md:!w-[300px] md:!translate-x-0 md:py-9`}
      >
         <header className="flex items-center justify-between gap-2 md:justify-center">
            <Image src={"/assets/CodeAlgo_Logo.png"} className="h-9 md:cursor-pointer" alt="logo" loading="lazy" width={90} height={45} />
            <MdClose size={26} cursor={"pointer"} onClick={onClose} className="md:hidden" />
         </header>
         <div className="mt-12">
            <NavButton title="Main Dashboard" image="Dashboard.svg" url="/parents" />
         </div>
         <div className="relative">
            {/* <NavButton title="Messages" image="message.svg" url="/parents/messages" notification={unread > 0 ? unread : ""} /> */}
         </div>
         <div className="my-2">
            <h2 className="ml-7 mb-3 text-xl font-medium text-[#A8ABB0]">ACCOUNT</h2>
            <NavButton title="Student Accounts" image="people.svg" url="/parents/student" />
            <NavButton title="Billing" image="Billing.svg" url="/parents/billing" />
            <NavButton title="Organization" image={<SlOrganization />} url="/parents/organization" />
         </div>
         <div className="my-2">
            <h2 className="ml-7 mb-3 text-xl font-medium text-[#A8ABB0]">SAFETY</h2>
            <NavButton title="Screen Time" image="screen-time.svg" url="/parents/screen-time" />
            {/* <NavButton title="Multiplayer" image="game.svg" url="/parents/multiplayer" /> */}
         </div>
         <NavButton image={<GiHelp size={22} />} url={DEFAULT_SUPPORT.discord} title="Get Help"></NavButton>
      </aside>
   );
}
