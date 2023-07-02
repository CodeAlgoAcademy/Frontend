import Login from "@/components/miscellaneous/login";
import { useRouter } from "next/router";
import React from "react";

const Parent = () => {
   const router = useRouter();

   return <Login route={router.query.redirect ? router.query.redirect : null} />;
};

export default Parent;
