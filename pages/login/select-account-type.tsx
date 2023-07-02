import SelectAccountType from "@/components/miscellaneous/selectAccountType";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "store/authSlice";

export default function SelectUserType() {
   console.log("router.query.redirect");

   return <SelectAccountType />;
}
