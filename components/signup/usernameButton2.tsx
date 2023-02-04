import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'store/authSlice';
import { RootState } from 'store/store';
import { generateUsername } from 'utils/generateUsername';
const UsernameButton2 = () => {
  const dispatch = useDispatch();
  const { firstname, lastname } = useSelector((state: RootState) => state.user.auth);
  return (
    <button
      type="button"
      className="block  h-[2.5rem] mt-2 text-center w-full text-[#2073FA] bg-white font-bold rounded-xl hover:text-white hover:bg-[#2073FA] transition duration-300 ease-out"
      onClick={() => {
        if (firstname || lastname) {
          const randomName = generateUsername(firstname, lastname);
          dispatch(updateUser({ key: 'username', value: randomName }));
        }
      }}
    >
      Generate Username
    </button>
  );
};

export default UsernameButton2;
