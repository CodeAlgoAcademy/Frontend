import Login from "@/components/miscellaneous/login";
import { useRouter } from "next/router";
import React from "react";

const Parent = () => {
   const router = useRouter();

   console.log("router.query.redirect");
   return null;
   // return <Login />;
};

export default Parent;
