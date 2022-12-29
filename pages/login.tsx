import React, { ChangeEvent, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import CleverBtn from "../components/cleverBtn";
import GoogleBtn from "../components/googleBtn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IInputFields } from "../types/interfaces";
import { loginUser } from "../services/authService";
import { clearFields, updateUser } from "store/authSlice";
import styles from "../styles/styles";
import { useRouter } from "next/router";

const Login = () => {
  const dispatch = useDispatch();
  const { email, password } = useSelector(
    (state: RootState) => state.user.auth
  );
  const router = useRouter();
  const inputFields: IInputFields[] = [
    {
      type: "email",
      placeholder: "Enter Email*",
      name: "email",
      value: email,
    },
    {
      type: "password",
      placeholder: "Enter Password*",
      name: "password",
      value: password,
    },
  ];

  const login = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await dispatch(loginUser());
    if (!data?.error?.message) {
      router.push("/addClass");
    }
  };

  useEffect(() => {
    dispatch(clearFields());
  }, []);

  return (
    <main>
      <Head>
        <title>CodeAlgo Academy | Login</title>
      </Head>

      <section className="w-full min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white w-[95vw] max-w-[600px] mx-auto rounded-md p-[40px] md:p-[50px] shadow-md">
          {/* title */}
          <div className="flex flex-col gap-y-1 mb-4">
            <h1 className="md:text-3xl text-center text-lg font-bold">
              Welcome to CodeAlgo Academy
            </h1>
            <p className="text-grey-800 md:text-lg text-[16px] text-center">
              New here?
              <Link href="/signup">
                <a className="underline text-mainPurple">Create an account</a>
              </Link>
            </p>
          </div>

          {/* providers button */}
          <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row gap-x-6">
            <CleverBtn />
            <GoogleBtn />
          </div>

          {/* or span */}
          <span className="text-gray-700 block text-center my-5 relative after:absolute after:top-[50%] after:-translate-y-[50%] after:right-0 after:w-[42%] after:h-[1px] after:bg-gray-700 before:absolute before:top-[50%] before:-translate-y-[50%] before:left-0 before:w-[42%] before:h-[1px] before:bg-gray-700">
            OR
          </span>

          <form className="w-full" onSubmit={login}>
            {/* inputs */}
            <div className="flex flex-col gap-y-3 mb-6 items-start">
              {inputFields.map((inputField: IInputFields, index: number) => {
                const { type, placeholder, name, value } = inputField;
                return (
                  <input
                    key={index}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        updateUser({ key: name, value: e.target.value })
                      );
                    }}
                    minLength={name === "password" ? 8 : 0}
                    required
                    className={styles.input}
                  />
                );
              })}
            </div>
            <span className="flex flex-row items-center gap-x-2 mt-4">
              <input
                type="checkbox"
                id="terms"
                className="accent-mainPurple"
                required
              />
              <label htmlFor="terms">I accept the terms and conditions</label>
            </span>
            {/* login button */}

            <div className="text-right">
              <button
                type="submit"
                className="py-3 w-[150px] text-[16px] rounded-[30px] text-white bg-mainPurple hover:shadow-md"
              >
                Log In
              </button>
            </div>
          </form>

          <p className="text-right underline text-[16px] mt-2 cursor-pointer">
            Forgot Password
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
