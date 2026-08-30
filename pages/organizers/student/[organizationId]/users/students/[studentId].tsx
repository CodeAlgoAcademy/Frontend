import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import OrganizerLayout from "@/components/layouts/OrganizerLayout";
import { ISingleStudent } from "types/interfaces";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeftCircle } from "react-icons/bs";
import { getSingleStudentOrganizationUsers } from "services/organizersService";
import { useTranslation } from "react-i18next";

const OrganizationSingleStudentPage = () => {
   const { t } = useTranslation("organizer");
   const router = useRouter();
   const { organizationId, studentId } = router.query;
   const dispatch = useDispatch();
   
   const { selectedOrganization, singlStudentUsers, isLoadingStudents } = useSelector(
      (state: RootState) => state.organizer
   );
   
   const [student, setStudent] = useState<ISingleStudent | null>(null);

   useEffect(() => {
      if (studentId && organizationId) {
         dispatch(getSingleStudentOrganizationUsers(studentId as string) as any);
      }
   }, [dispatch, studentId, organizationId]);

     useEffect(() => {
        if ((singlStudentUsers as any)?.student) {
           setStudent((singlStudentUsers as any).student);
        }
      }, [singlStudentUsers]);

   if (isLoadingStudents) {
      return (
         <OrganizerLayout>
            <div className="flex justify-center items-center h-64">
               <p>{t("loadingStudentDetails")}</p>
            </div>
         </OrganizerLayout>
      );
   }

   if (!student) {
      return (
         <OrganizerLayout>
            <div className="flex justify-center items-center h-64">
               <p>{t("studentNotFound")}</p>
            </div>
         </OrganizerLayout>
      );
   }

   return (
      <OrganizerLayout>
         <div className="p-6">
            <Link href="/organizers/student">
               <div className="flex items-center mb-4 cursor-pointer text-mainColor hover:underline">
                  <BsArrowLeftCircle className="mr-2" />
                  {t("backToStudents")}
               </div>
            </Link>
            
            <div className="bg-white shadow-md rounded-lg p-6">
               <h1 className="text-2xl font-bold mb-6 text-mainColor">{t("studentProfile")}</h1>
               
               <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <div className="h-[150px] w-[150px] overflow-hidden rounded-full">
                     <Image 
                        width={150} 
                        height={150} 
                        src={ "/assets/no user.png"} 
                        alt={`${student.firstName} ${student.lastName}`}
                        className="object-cover"
                     />
                  </div>
                  
                  <div className="flex-1">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                           <h2 className="text-lg font-semibold mb-2 text-mainColor">{t("personalInformation")}</h2>
                           <div className="space-y-2">
                              <p><strong>{t("nameLabel")}</strong> {student.firstName} {student.lastName}</p>
                              <p><strong>{t("emailLabel")}</strong> {student.email}</p>
                              <p><strong>{t("usernameLabel")}</strong> {student.username}</p>
                              
                           </div>
                        </div>
                        
                        {/* <div>
                           <h2 className="text-lg font-semibold mb-2 text-mainColor">{t("organizationInformation")}</h2>
                           <div className="space-y-2">
                              <p><strong>{t("organizationIdLabel")}</strong> {organizationId}</p>
                              <p><strong>{t("studentIdLabel")}</strong> {studentId}</p>
                              <p><strong>{t("organizationLabel")}</strong> {selectedOrganization?.name}</p>
                           </div>
                        </div> */}
                     </div>
                  </div>
               </div>
               
               {student.assignments && student.assignments.length > 0 && (
                  <div className="mt-8">
                     <h2 className="text-xl font-semibold mb-4 text-mainColor">{t("assignmentsProgress")}</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {student.assignments.map((assignment, index) => (
                           <div key={index} className="border border-gray-200 p-4 rounded-md bg-gray-50">
                              <p className="font-medium">{assignment.title}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </OrganizerLayout>
   );
};

export default OrganizationSingleStudentPage;
