import React, { useState } from 'react';

interface StudentState {
  firstname: string;
  lastname: string;
}

export default function ParentSignUp3() {
  const [formData, setFormData] = useState<StudentState>({
    firstname: '',
    lastname: '',
  });
  const { firstname, lastname } = formData

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div key={3}>
      <h1 className='font-bold text-[32px]'>Add your student account(s)</h1>
      <form className='mt-6'>
          <p className='font-semibold'>Student details</p>
          <div className='grid grid-cols-2 gap-3'>
            <div className="relative">
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First Name"
                className={styles.input}
                value={firstname}
                onChange={onChange}
                required
              />
              <label htmlFor="firstname" className={styles.label}>First Name</label>
            </div>
            <div className="relative">
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last Name"
                className={styles.input}
                value={lastname}
                onChange={onChange}
                required
              />
              <label htmlFor="lastname" className={styles.label}>Last Name</label>
            </div>
          </div>
      </form>
    </div>
  );
}


const styles = {
  label: "pointer-events-none absolute top-3 left-2 origin-left -translate-y-1/2 transform text-[12px] text-slate-500 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-800 peer-focus:top-3 peer-focus:pl-0 peer-focus:text-[12px] peer-focus:text-slate-500",
  input: "bg-white peer mt-1 w-full px-2 py-3 placeholder:text-transparent focus:border-slate-100 focus:outline-none",
  generate: 'bg-blue-500 text-4xl rounded-xl h-full p-2 text-white cursor-pointer hover:bg-opacity-80',
}