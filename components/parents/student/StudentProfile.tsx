import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import ContentBox from "../UI/ContentBox";
import StudentProfileInfo from "../UI/StudentProfileInfo";

const StudentProfile = () => {
   const { currentChild } = useSelector((state: RootState) => state.parentChild);

   return (
      <ContentBox padding="small" size="large" title="Child's Profile" style={{ minWidth: "100%", maxWidth: "100%", marginBottom: "1.5rem" }}>
         <div className="flex h-[240px] w-full flex-col gap-[2rem] overflow-y-scroll p-8 lg:flex-row lg:gap-[3rem]">
            <div className="h-full w-full min-w-fit max-w-fit">
               <img
                  src="/assets/no user.png"
                  alt="user "
                  className="h-[120px] w-[120px] rounded-full object-cover object-center lg:h-[200px] lg:w-[200px]"
               />
            </div>
            <div className="grid flex-1 grid-cols-2 gap-[1rem]">
               <StudentProfileInfo header="Name" body={currentChild?.fullName} />
               <StudentProfileInfo header="Username" body={currentChild?.username} />
               <StudentProfileInfo header="Coding Experience" body={currentChild?.codingExperience} />
               <StudentProfileInfo header="Date of birth" body={currentChild?.dob} />
            </div>
         </div>
      </ContentBox>
   );
};

export default StudentProfile;
