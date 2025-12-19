import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { openSuccessModal } from "store/modalSlice";
import { updateStudentPassword } from "store/teacherStudentSlice";

interface Props {
   closeModal(): void;
   studentId: string | number | undefined;
   classId: string | number | undefined;
   studentName: string;
}

const TeacherResetPassword = ({ closeModal, studentId, classId, studentName }: Props) => {
   const dispatch = useDispatch();
   const [password, setPassword] = useState<string>("");
   const [isSubmitting, setIsSubmitting] = useState(false);

   const submit = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
         const result = await dispatch(
            updateStudentPassword({ 
               class_id: classId, 
               student_id: studentId, 
               password 
            }) as any
         );

         if (!result?.error) {
            closeModal();
         }
      } catch (error) {
         console.error('Failed to reset password:', error);
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <form
         onSubmit={submit}
         className="max-w-screen  absolute bottom-[60%] z-[4] 
         w-[300px] rounded-md bg-gray-100 p-6 shadow-md hover:shadow-lg"
      >
         <h4 className="text-[.9rem] font-medium mb-3">Reset {studentName}'s password</h4>
         <input
            className={styles?.input}
            placeholder="Enter new password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required={true}
            minLength={6}
         />

         <button 
            type="submit" 
            disabled={isSubmitting}
            className="mt-4 ml-auto block rounded-md border-none bg-mainColor px-6 py-[8px] text-white outline-none disabled:opacity-50 disabled:cursor-not-allowed"
         >
            {isSubmitting ? 'Submitting...' : 'Submit'}
         </button>
      </form>
   );
};

const styles = {
   input: `px-3 py-[10px] border-b-[2px] outline-none w-full bg-transparent border-b-[#333] text-[#333] placeholder:text-[#333] focus:border-b-mainColor transition-all duration-300`,
};

export default TeacherResetPassword;