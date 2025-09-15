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

const OrganizationSingleStudentPage = () => {
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
      if (singlStudentUsers) {
         setStudent(singlStudentUsers as unknown as ISingleStudent);
      }
   }, [singlStudentUsers]);

   if (isLoadingStudents) {
      return (
         <OrganizerLayout>
            <div className="flex justify-center items-center h-64">
               <p>Loading student details...</p>
            </div>
         </OrganizerLayout>
      );
   }

   if (!student) {
      return (
         <OrganizerLayout>
            <div className="flex justify-center items-center h-64">
               <p>Student not found</p>
            </div>
         </OrganizerLayout>
      );
   }

   return (
      <OrganizerLayout>
         <div className="p-6">
            <Link href="/organizer/students">
               <div className="flex items-center mb-4 cursor-pointer text-mainColor hover:underline">
                  <BsArrowLeftCircle className="mr-2" />
                  Back to Students
               </div>
            </Link>
            
            <div className="bg-white shadow-md rounded-lg p-6">
               <h1 className="text-2xl font-bold mb-6 text-mainColor">Student Profile</h1>
               
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
                           <h2 className="text-lg font-semibold mb-2 text-mainColor">Personal Information</h2>
                           <div className="space-y-2">
                              <p><strong>Name:</strong> {student.firstName} {student.lastName}</p>
                              <p><strong>Email:</strong> {student.email}</p>
                              <p><strong>Username:</strong> {student.username}</p>
                              <p><strong>Status:</strong> 
                                 <span className={`ml-2 inline-block w-3 h-3 rounded-full ${student.active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                 {student.active ? " Active" : " Inactive"}
                              </p>
                           </div>
                        </div>
                        
                        <div>
                           <h2 className="text-lg font-semibold mb-2 text-mainColor">Organization Information</h2>
                           <div className="space-y-2">
                              <p><strong>Organization ID:</strong> {organizationId}</p>
                              <p><strong>Student ID:</strong> {studentId}</p>
                              <p><strong>Organization:</strong> {selectedOrganization?.name}</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               
               {/* Student Progress/Assignments Section */}
               {student.assignments && student.assignments.length > 0 && (
                  <div className="mt-8">
                     <h2 className="text-xl font-semibold mb-4 text-mainColor">Assignments & Progress</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {student.assignments.map((assignment, index) => (
                           <div key={index} className="border border-gray-200 p-4 rounded-md bg-gray-50">
                              <p className="font-medium">{assignment.title}</p>
                              {/* <p className="text-sm text-gray-600">Status: {assignment.status}</p>
                              {assignment.dueDate && (
                                 <p className="text-sm text-gray-600">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                              )} */}
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