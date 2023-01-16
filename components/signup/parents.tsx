import React, { ChangeEvent, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, IInputFields } from '../../types/interfaces';
import { RootState } from '../../store/store';
import styles from '../../styles/styles';
import { countryList } from './countries';
import { updateUser } from '../../store/authSlice';
import { generateUsername } from '../../utils/generateUsername';
import UsernameButton from './usernameButton';

const Parents = () => {
  const dispatch = useDispatch();
  const { firstname, lastname, email, password, username } = useSelector(
    (state: RootState) => state.user.auth,
  );

  const inputFields: IInputFields[] = [
    {
      name: 'firstname',
      type: 'text',
      placeholder: 'Enter Firstname',
      value: firstname,
    },
    {
      name: 'lastname',
      type: 'text',
      placeholder: 'Enter Lastname',
      value: lastname,
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Enter Email',
      value: email,
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Enter Password',
      value: password,
    },
    {
      name: 'username',
      type: 'text',
      placeholder: 'Enter Username',
      value: username,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-[1rem] items-start">
      {inputFields.map((inputField: IInputFields, index: number) => {
        const { type, name, placeholder, value } = inputField;

        return (
          <input
            key={index}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch(updateUser({ key: name, value: e.target.value }));
            }}
            className={styles.input}
          />
        );
      })}
      <UsernameButton />

      <select
        className={styles.input}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
          const value = event.target.options[event.target.selectedIndex].value;
          dispatch(updateUser({ key: 'country', value }));
        }}
      >
        <option value="Select Country">Select Country</option>
        {countryList.map((countryOption: string, index: number): ReactNode => {
          return (
            <option value={countryOption} key={index}>
              {countryOption}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Parents;
