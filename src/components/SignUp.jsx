import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { FireBaseContext } from "../context/FireBaseContext";
import { Link, useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";

export default function SignUp() {
  const {
    SignUp,
    userUpdateData,
    setSignInError,
    setSignUpError,
    signUpError,
  } = useContext(FireBaseContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passValid, setPassValid] = useState(false);
  const navigate = useNavigate();
  function handelCreateUser() {
    if (!validatePassword(pass)) {
      console.log("not valid pass");
      setPassValid(true);
      return;
    }
    SignUp(email, pass)
      .then((res) => {
        navigate("/");
        console.log(res);
        sendEmailVerification(res.user)
          .then((res) => console.log("veryfy email", res))
          .catch((err) => console.log("ERR", err));
        userUpdateData({ displayName: userName })
          .then((result) => console.log(res))
          .catch((err) => console.log("ERROR"));

        console.log(res);
      })
      .catch((err) => {
        setSignUpError(true);
        console.log("ERROR");
        return;
      });
    setUserName("");
    setEmail("");
    setPass("");

    setSignInError(false);
  }
  function validatePassword(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }
  return (
    <>
      <section>
        <form className="flex flex-col gap-4 max-w-[500px] mx-auto mt-11">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <TextField
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            id="outlined-basic"
            label="User Name"
            variant="outlined"
          />
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="outlined-password-input"
            label="email"
            type="email"
            autoComplete="current-password"
          />
          <TextField
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button onClick={handelCreateUser} variant="outlined">
            Sign Up
          </Button>
          {signUpError ? (
            <p className="text-center text-sm text-red-600">
              This Email is All Ready Exist. Try with Another Email.
            </p>
          ) : (
            ""
          )}
          {passValid ? (
            <p className="text-center text-sm text-orange-400">
              PassWord is not Strong use "atleast 1-number 1-Special-charecter
              1-lowerCase 1-upperCase & 8-charecter"
            </p>
          ) : (
            ""
          )}
        </form>
      </section>
    </>
  );
}
