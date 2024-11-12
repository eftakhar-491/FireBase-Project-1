import { Link, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import { FireBaseContext } from "./context/FireBaseContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth, { app } from "./FireBase/firebase.init";
import { useEffect, useState } from "react";
import { getDatabase, ref, set } from "firebase/database";

function App() {
  const [user, setUser] = useState(null);
  const [signInError, setSignInError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  function SignUp(email, pass) {
    return createUserWithEmailAndPassword(auth, email, pass);
  }
  function userUpdateData(data) {
    return updateProfile(auth.currentUser, data);
  }
  function SignIn(email, pass) {
    return signInWithEmailAndPassword(auth, email, pass);
  }
  function Logout() {
    return signOut(auth);
  }
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (crrUser) => {
      console.log("crrUser ", crrUser);

      if (crrUser) {
        setUser(crrUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);
  useEffect(() => {
    if (user?.emailVerified) {
      const db = getDatabase(app);
      set(ref(db, `/users/${user?.uid}`), {
        userId: user?.uid,
        userName: user?.displayName,
        userEmail: user?.email,
      });
      // set(ref(db, `/demo/${user?.uid}`), {
      //   userId: user?.uid,
      //   userName: user?.displayName,
      //   userEmail: user?.email,
      // });
    }
  }, [user]);
  return (
    <FireBaseContext.Provider
      value={{
        signUpError,
        setSignUpError,
        user,
        setUser,
        SignUp,
        SignIn,
        userUpdateData,
        Logout,
        signInError,
        setSignInError,
      }}
    >
      <>
        {/* layout */}
        <Nav />
        {/* <Home /> */}

        <Outlet />
      </>
    </FireBaseContext.Provider>
  );
}

export default App;
