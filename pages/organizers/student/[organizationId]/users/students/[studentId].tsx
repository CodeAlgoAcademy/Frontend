import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import OrganizerLayout from "@/components/layouts/OrganizerLayout";
import { ISingleStudent } from "types/interfaces";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeftCircle } from "react-icons/bs";
import { getSingleStudentOrganizationUsers, getStudentOrganizationLineProgress, getStudentOrganizationProgress } from "services/organizersService";
import { useTranslation } from "react-i18next";
import { IChildTopics } from "types/interfaces/parent.interface";
import StudentTable from "@/components/Teachers/students/StudentTable";
import StudentProfileSkeleton from "@/components/organizers/UI/StudentProfileSkeleton";
import { useAppDispatch } from "store/hooks";
import Loader from "@/components/UI/loader";

const OrganizationSingleStudentPage = () => {
   const { t } = useTranslation("organizer");
   const router = useRouter();
   const { organizationId, studentId } = router.query;
   const dispatch = useAppDispatch();
   
   const { selectedOrganization, isLoadingStudents } = useSelector(
      (state: RootState) => state.organizer
   );
   
   const [student, setStudent] = useState<ISingleStudent | null>(null);
   const [studentProgress, setStudentProgress] = useState<IChildTopics | null>(null);
   const [isProgressLoading, setIsProgressLoading] = useState(false);

   const calculateAge = (dob: string): number => {
      if (!dob) return 0;
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
         age--;
      }
      return age;
   };

    useEffect(() => {
       if (studentId && organizationId) {
          setIsProgressLoading(true);
          dispatch(getSingleStudentOrganizationUsers(studentId as string) as any)
             .then((result: any) => {
                if (result?.payload?.student) {
                   const studentData = result.payload.student;
                   setStudent(studentData as ISingleStudent);
                   const age = calculateAge(studentData?.dob || "");
                   const thunk = age < 14 ? getStudentOrganizationProgress : getStudentOrganizationLineProgress;
                   return dispatch(thunk(studentId as string) as any);
                }
             })
             .then((result: any) => {
                if (result?.payload) {
                   const rawData = result.payload;
                   setStudentProgress({
                      current: { title: "", level: 0, progress: 0 },
                      topic: Array.isArray(rawData) ? rawData : rawData?.topic || [],
                   });
                }
             })
             .finally(() => setIsProgressLoading(false));
       }
    }, [studentId, organizationId]);

   if (isLoadingStudents) {
      return (
         <OrganizerLayout>
            <StudentProfileSkeleton />
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
                {studentProgress && !isProgressLoading && (
                   <div className="mt-8">
                      <h2 className="text-xl font-semibold mb-4 text-mainColor">{t("progress")}</h2>
                      <StudentTable student={student as ISingleStudent} details={student.assignments || []} progress={studentProgress} />
                   </div>
                )}
                {isProgressLoading && (
                   <div className="mt-8 flex items-center justify-center bg-white py-10">
                      <Loader size={28} />
                   </div>
                )}
            </div>
         </div>
      </OrganizerLayout>
   );
};

export default OrganizationSingleStudentPage;
