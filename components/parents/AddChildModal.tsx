import React, { ChangeEvent } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { closeAddChildModal } from "store/modalSlice";
import { addChild, getChildren, resetChild, resetScreenTime, updateChild } from "store/parentChildSlice";
import { RootState } from "store/store";

const AddChildModal = () => {
   const { fullName, codingExperience, dob, password, username } = useSelector((state: RootState) => state.parentChild);

   const dispatch = useDispatch();
   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(updateChild({ key: e.target.name, value: e.target.value }));
   };

   const addSingleChild = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(resetScreenTime());
      const data = await dispatch(addChild());
      await dispatch(getChildren());
      dispatch(closeAddChildModal());
   };

   return (
      <main className="fixed top-0 left-0 z-[6] flex min-h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.5)]">
         <div className="z-20 w-[92vw] max-w-[900px] rounded-md bg-white p-8">
            <header className="flex items-center justify-between">
               <h2 className="text-[1.1rem] font-bold text-[#2073fa]">Add Child</h2>
               <i
                  className="text-[22px] font-bold text-red-600"
                  onClick={() => {
                     dispatch(closeAddChildModal());
                  }}
               >
                  <MdClose />
               </i>
            </header>
            <form action="" onSubmit={addSingleChild}>
               <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                     <label htmlFor="" className="mb-2 block">
                        Full Name
                     </label>
                     <input
                        type="text"
                        className={styles.input}
                        name="fullName"
                        placeholder="Enter Child's Full Name"
                        value={fullName}
                        required
                        onChange={onChange}
                     />
                  </div>
                  <div>
                     <label htmlFor="" className="mb-2 block">
                        Username
                     </label>
                     <input
                        type="text"
                        className={styles.input}
                        name="username"
                        placeholder="Enter Child's Username"
                        value={username}
                        required
                        onChange={onChange}
                     />
                  </div>
                  <div>
                     <label htmlFor="" className="mb-2 block">
                        Password
                     </label>
                     <input
                        type="password"
                        className={styles.input}
                        name="password"
                        placeholder="Enter Child's Password"
                        value={password}
                        required
                        onChange={onChange}
                     />
                  </div>

                  <div>
                     <label htmlFor="" className="mb-2 block">
                        Date Of Birth
                     </label>
                     <input
                        type="date"
                        className={styles.input}
                        name="dob"
                        placeholder="Enter Child's Date Of Birth"
                        value={dob}
                        required
                        onChange={onChange}
                     />
                  </div>
                  <div>
                     <label htmlFor="" className="mb-2 block">
                        Experience Level
                     </label>
                     <select
                        className={styles.input}
                        name="codingExperience"
                        placeholder="Enter Child's Date Of Birth"
                        value={codingExperience}
                        required
                        onChange={(e) => {
                           const value = e.target.selectedOptions[0].value;
                           dispatch(updateChild({ key: "codingExperience", value }));
                        }}
                     >
                        <option value="" disabled>
                           Select Experience
                        </option>
                        <option value="experienced">Experienced</option>
                        <option value="standard">Standard</option>
                        <option value="beginner">Beginner</option>
                        <option value="amateur">Amateur</option>
                     </select>
                  </div>
               </div>
               <button className={`${styles.input} mt-4 block w-full bg-[#2073fa] text-white`}>Add Child</button>
            </form>
         </div>
      </main>
   );
};

const styles = {
   input: "w-full rounded-md border-[1.5px] px-4 py-2 placeholder:text-gray-800 outline-0 focus:border-[#2073fa]",
};

export default AddChildModal;
