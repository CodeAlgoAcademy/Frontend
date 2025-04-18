import React, { FC, ChangeEvent, useState, DetailedHTMLProps, InputHTMLAttributes } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { cn } from "utils";

interface PasswordInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
   value: string;
   onChange(e: ChangeEvent<HTMLInputElement>): void;
}

export const PasswordInput: FC<PasswordInputProps> = ({ value, onChange, className, ...props }) => {
   const [showPassword, setShowPassword] = useState<boolean>(false);

   const togglePassword = () => setShowPassword((prev) => !prev);

   return (
      <div className="relative">
         <input
            className={cn("auth-input", className)}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
               onChange(e);
            }}
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            required
            {...props}
         />
         <span className="absolute top-[50%] right-4 z-[5] -translate-y-[50%] cursor-pointer text-mainRed" onClick={togglePassword}>
            {showPassword ? <BsEye size={20} /> : <BsEyeSlash size={20} />}
         </span>
      </div>
   );
};
