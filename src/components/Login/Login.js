import React, { useContext } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from "../../App";
import firebaseConfig from "./firebase.config";
import { useHistory, useLocation } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };

  return (
    <>
      <h1>This is Login</h1>
      <button onClick={handleGoogleSignIn}>Sign in</button>
    </>
  );
};

export default Login;
