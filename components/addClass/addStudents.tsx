import React, { ChangeEvent } from 'react';
import { FaChevronLeft, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { updateClassDetails } from '../../store/addClassSlice';
import { closeAddStudentsModal } from '../../store/modalSlice';
import { RootState } from '../../store/store';
import styles from '../../styles/styles';
import { IInputFields } from '../../types/interfaces';
import { generateUsername } from 'utils/generateUsername';

const AddStudents = () => {
  const dispatch = useDispatch();
  const { firstName, lastName, email, username } = useSelector(
    (state: RootState) => state.addClass.student,
  );

  const inputFields: IInputFields[] = [
    {
      type: 'text',
      name: 'firstName',
      placeholder: 'Enter Student First Name',
      value: firstName,
    },
    {
      type: 'text',
      name: 'lastName',
      placeholder: 'Enter Student Last Name',
      value: lastName,
    },
    {
      type: 'email',
      name: 'email',
      placeholder: 'Enter Student Email',
      value: email,
    },
    {
      type: 'text',
      name: 'username',
      placeholder: 'Enter Username',
      value: username,
    },
  ];

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(closeAddStudentsModal());
  };

  return (
    <form className="py-8 flex-[0.9]" onSubmit={handleSubmit}>
      <header className="px-8 w-full mb-6 flex gap-x-2 items-center">
        <span
          className="text-[20px] font-bold"
          onClick={() => {
            dispatch(closeAddStudentsModal());
          }}
        >
          <FaChevronLeft />
        </span>
        <h1 className="md:text-[30px] text-[20px] font-bold">Add new student(s)</h1>
      </header>
      <section className="px-8 grid md:grid-cols-2 gap-[1rem]">
        {inputFields?.map((inputField: IInputFields, index: number) => {
          const { name, type, placeholder, value } = inputField;
          return (
            <input
              key={index}
              type={type}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                dispatch(
                  updateClassDetails({
                    typeofState: 'student',
                    key: name,
                    value: e.target.value,
                  }),
                );
              }}
              className={styles.input}
            />
          );
        })}
        <button
          type="button"
          className=" px-2 py-3 rounded-md bg-mainPurple shadow-md text-white active:scale-[0.91]"
          onClick={() => {
            if (firstName || lastName) {
              const randomName = generateUsername(firstName, lastName);
              dispatch(
                updateClassDetails({
                  typeofState: 'student',
                  key: 'username',
                  value: randomName,
                }),
              );
            }
          }}
        >
          Generate Username
        </button>
      </section>
      <section className="flex w-full justify-end md:items-center items-end mt-8 md:flex-row md:gap-y-0 gap-y-4 flex-col pt-5 border-t-2 px-8">
        {/* <div>
          <input type="file" id="studentsUpload" className="hidden" />
          <label
            htmlFor="studentsUpload"
            className="w-full flex flex-row gap-x-2 items-center cursor-pointer"
          >
            <span className="w-[30px] h-[30px] border-2 border-black rounded-full flex justify-center items-center text-[20px] text-black font-lighter">
              <FaPlus />
            </span>
            <h3 className="text-[16px] font-bold">Bulk Import</h3>
          </label>
        </div> */}
        <button className="py-3 px-4 min-w-[150px] text-[16px] rounded-[30px] text-white bg-mainPurple hover:shadow-md">
          Add Student(s)
        </button>
      </section>
    </form>
  );
};

export default AddStudents;
