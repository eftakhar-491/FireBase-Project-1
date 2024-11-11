import React, { useContext } from "react";
import { FireBaseContext } from "../context/FireBaseContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

export default function PrivetRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useContext(FireBaseContext);
  console.log(user);
  if (user?.emailVerified === false) {
    return (
      <>
        <Alert severity="warning">please veryfy your account </Alert>
        {/* <Navigate to={"/"}></Navigate>; */}
      </>
    );
  }
  if (user && user.emailVerified) {
    return children;
  }
  return <Navigate to={"/signin"}></Navigate>;

  //   return <div>PrivetRoute</div>;
}
