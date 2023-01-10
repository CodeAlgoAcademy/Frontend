import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'store/authSlice';
import { RootState } from 'store/store';
import { generateUsername } from 'utils/generateUsername';
const UsernameButton = () => {
  const dispatch = useDispatch();
  const { firstname, lastname } = useSelector((state: RootState) => state.user.auth);
  return (
    <button
      type="button"
      className="px-2 py-3 rounded-md bg-mainPurple shadow-md text-white active:scale-[0.91]"
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

export default UsernameButton;
