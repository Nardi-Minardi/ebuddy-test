"use client";

import React from "react";
import Button from "@mui/material/Button";
//icon from material ui
import { Google } from "@mui/icons-material";
//import firebase
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { loginWithGoogle } from "@/store/actions";

const LoginGoogleButton: React.FC = () => {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = result.user.accessToken;
      loginWithGoogle(token).then((res) => {
        const cookiesName = process.env.APP_NAME + "-token";
        Cookies.set(cookiesName, res.token, {
          expires: res.expiresIn,
          secure: true,
        });
        router.push("/");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant='contained' startIcon={<Google />} onClick={handleLogin}>
      Login with Google
    </Button>
  );
};

export default LoginGoogleButton;
