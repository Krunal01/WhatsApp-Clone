import React, { useContext } from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./ifirebase";
import { StateContext, useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
  const [{ user }, dispatch] = useStateValue();
  //   const [{ user }, dispatch] = useContext(StateContext);
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })

      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      {/* <h1>Login</h1> */}
      <div className="login_container">
        <img
          src="https://www.freepnglogos.com/uploads/whatsapp-logo-png-hd-2.png"
          alt=""
        />

        <div className="login_text">
          <h1>Sign in to WhatsApp</h1>
        </div>

        <Button type="submit" onClick={signIn}>
          Sign In With Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
