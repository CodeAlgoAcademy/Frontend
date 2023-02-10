import React, { useState } from 'react';
import { BiRefresh } from 'react-icons/bi';
import { generateUsername } from 'utils/generateUsername';

interface StudentState {
  firstname: string;
  lastname: string;
  username: string;
}

export default function ParentSignUp3() {
  const [formData, setFormData] = useState<StudentState>({
    firstname: '',
    lastname: '',
    username: '',
  });
  const { firstname, lastname, username } = formData

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const generateusername = () => {
    if (firstname && lastname) {
      const rand = generateUsername(firstname, lastname)
      setFormData({ ...formData, username: rand })
    }
  }

  return (
    <div key={3}>
      <h1 className='font-bold text-[32px]'>Add your student account(s)</h1>
      <form className='mt-6'>
          <p>Student details</p>
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
          <div className='flex relative mt-6 items-center space-x-3'>
            <div className="flex-1">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                className={styles.input}
                value={username}
                onChange={onChange}
                required
              />
              <label htmlFor="username" className={styles.label}>username</label>
            </div>
            <div title='Generate username' className={styles.generate} onClick={generateusername}>
              <BiRefresh />
            </div>
          </div>
      </form>
      <button className={styles.addBtn} type="button">Add another student</button>
    </div>
  );
}


const styles = {
  label: "pointer-events-none absolute top-3 left-2 origin-left -translate-y-1/2 transform text-[12px] text-slate-500 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-800 peer-focus:top-3 peer-focus:pl-0 peer-focus:text-[12px] peer-focus:text-slate-500",
  input: "bg-white peer mt-1 w-full px-2 py-3 placeholder:text-transparent focus:border-slate-100 focus:outline-none",
  generate: 'bg-blue-500 text-4xl rounded-xl h-full p-2 text-white cursor-pointer hover:bg-opacity-80',
  addBtn: 'block p-2 mt-3 text-center w-full text-white bg-[#2073FA] font-bold rounded-xl'
}