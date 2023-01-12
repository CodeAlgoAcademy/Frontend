import React, { useState, ChangeEvent } from 'react';
import { generateUsername } from 'utils/generateUsername';
import { useDispatch } from 'react-redux';
import { addStudent, getStudents, studentsBulkImport } from 'store/studentSlice';
import { Student, IInputFields } from 'types/interfaces';
import style from '@/styles/styles';
import { FaTimes, FaChevronLeft, FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { getAllClasses } from 'services/classesService';
import { openErrorModal } from 'store/fetchSlice';
interface State {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

const AddStudentModal = ({ setIsOpen }: { setIsOpen: any }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState<State>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
  });
  const [file, setFile] = useState<any>(null);
  const { email, firstName, lastName, username } = formData;

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

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

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (email && firstName && lastName) {
      const data: Student = {
        firstName,
        lastName,
        email,
        username,
      };

      dispatch(addStudent(data)).then((data: any) => {
        if (data.payload?.status === 200) {
          setIsOpen(false);
          dispatch(getStudents());
          if (router.pathname === '/addClass') {
            dispatch(getAllClasses());
          }
        }
      });
    }
  };

  const handleFileInputChange = (e: any) => {
    if (!e.target.files[0].type.includes('csv')) {
      dispatch(openErrorModal({ errorText: ['Uploaded file is not a csv file'] }));
    } else {
      setFile(e.target.files[0]);
    }
  };
  const handleFileSubmit = () => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    dispatch(studentsBulkImport(formData)).then((data: any) => {
      setIsOpen(false);
      dispatch(getStudents());
      if (router.pathname === '/addClass') {
        dispatch(getAllClasses());
      }
    });
  };

  return (
    <section className={`${style.modalOverlay} bg-[rgba(0,0,0,.25)]`}>
      {/* modal itself */}
      <main className="w-[90vw] max-w-[900px] mx-auto bg-white rounded-md flex shadow-lg relative">
        <span
          onClick={() => {
            setIsOpen(false);
            if (router.pathname === '/addClass') {
              dispatch(getAllClasses());
            }
          }}
          className="text-[30px] font-thin absolute z-10 top-[30px] right-[30px]"
        >
          <FaTimes />
        </span>
        <aside
          className={`flex-[0.075] min-h-full rounded-tl-md rounded-bl-md`}
          style={{ backgroundColor: '#FFE977' }}
        ></aside>

        <form className="py-8 flex-[0.9]" onSubmit={onSubmit}>
          <header className="px-8 w-full mb-6 flex gap-x-2 items-center">
            <span
              className="text-[20px] font-bold"
              onClick={() => {
                setIsOpen(false);
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
                    onChange(e);
                  }}
                  className={style.input}
                  required={!file && true}
                />
              );
            })}
            <button
              type="button"
              className=" px-2 py-3 rounded-md bg-mainPurple shadow-md text-white active:scale-[0.91]"
              onClick={() => {
                if (firstName || lastName) {
                  const randomName = generateUsername(firstName, lastName);
                  setFormData({ ...formData, username: randomName });
                }
              }}
            >
              Generate Username
            </button>
          </section>
          <section className="flex w-full justify-between md:items-center items-end mt-8 md:flex-row md:gap-y-0 gap-y-4 flex-col pt-5 border-t-2 px-8">
            <div>
              {/* input container */}
              <input
                type="file"
                id="studentsUpload"
                className="hidden"
                onChange={(e) => {
                  handleFileInputChange(e);
                }}
                value=""
              />
              <label
                htmlFor="studentsUpload"
                className="w-full flex flex-row gap-x-2 items-center cursor-pointer"
              >
                <span className="w-[30px] h-[30px] border-2 border-black rounded-full flex justify-center items-center text-[20px] text-black font-lighter">
                  <FaPlus />
                </span>
                <h3 className="text-[16px] font-bold">
                  {file ? 'File Added, click add student button to finish upload' : 'Bulk Import'}
                </h3>
              </label>
            </div>
            <button
              type="submit"
              className="py-3 px-4 min-w-[150px] text-[16px] rounded-[30px] text-white bg-mainPurple hover:shadow-md"
              onClick={() => {
                if (file) {
                  handleFileSubmit();
                }
              }}
            >
              Add Student(s)
            </button>
          </section>
          {file && (
            <div className="mt-2 w-full px-8">
              <div
                className="flex gap-x-2 items-center w-full hover:bg-red-50 max-w-fit py-3 px-3 cursor-pointer"
                onClick={() => {
                  setFile(null);
                }}
              >
                <span className="text-red-600 text-[22px] cursor-pointer">
                  <FaTimes />
                </span>
                <p>Delete Uploaded file</p>
              </div>
            </div>
          )}
        </form>
      </main>
    </section>
  );
};

export default AddStudentModal;

const styles = {
  bgBlack:
    'bg-black bg-opacity-60 w-[100vw] min-h-[100vh] fixed z-0 top-0 left-0 grid place-items-center',
  centered: ' place-items-center fixed',
  modal:
    'border-l-[40px] border-l-yellow-500 relative w-4/5 bg-[#f4f4f4] z-10 rounded-xl shadow-lg',
  modalHeader: 'h-14 bg-[#f4f4f4] overflow-hidden rounded-tl-2xl rounded-tr-2xl',
  heading: 'm-0 p-3 text-[#2c3e50] font-medium text-2xl text-center',
  closeBtn:
    'absolute top-0 right-0 text-[#f4f4f4] hover:bg-opacity-50 -mt-2 -mr-2 text-lg cursor-pointer p-1 rounded-full bg-red-500',
  modalBody: 'p-3 text-sm text-[#2c3e50] text-center',
  addBtn:
    'bg-purple-900 p-3 rounded-3xl text-white hover:bg-opacity-90 transition-all duration-500',
  bulkBtn: 'flex space-x-3 text-center items-center hover:bg-slate-200 p-3',
  plusIcon: 'border border-slate-700 rounded-full',
};
