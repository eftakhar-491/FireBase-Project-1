import React from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Outlet />
      {/* <SignUp /> */}
      {/* <SignIn /> */}
    </>
  );
}
