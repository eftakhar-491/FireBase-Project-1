import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { FireBaseContext } from "../context/FireBaseContext";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPass, setSigninPass] = useState("");

  const { SignIn, setSignInError, signInError } = useContext(FireBaseContext);
  function handelSignInUser() {
    SignIn(signinEmail, signinPass)
      .then((res) => console.log(res))
      .catch((err) => {
        setSignInError(true);
      });
    setSigninEmail("");
    setSigninPass("");
  }
  return (
    <>
      <div>
        <form className="flex flex-col gap-4 max-w-[500px] mx-auto mt-11">
          <h1 className="text-2xl font-bold">Log In</h1>

          <TextField
            value={signinEmail}
            onChange={(e) => setSigninEmail(e.target.value)}
            id="outlined-password-input"
            label="email"
            type="email"
            autoComplete="current-password"
          />
          <TextField
            value={signinPass}
            onChange={(e) => setSigninPass(e.target.value)}
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button onClick={handelSignInUser} variant="outlined">
            Sign In
          </Button>
          {signInError ? (
            <p className="text-center text-sm text-red-600">
              You have no matched Please{" "}
              <Link to={"/signup"}>
                <span className="cursor-pointer active:text-black text-blue-800 hover:underline font-bold">
                  SignUp
                </span>{" "}
              </Link>
              First...{" "}
            </p>
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
}
