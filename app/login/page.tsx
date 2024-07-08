import React from "react";
import LoginGoogleButton from "@/components/LoginGoogleButton";
import { Container, Box, Typography } from "@mui/material";

const Login: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}>
        <LoginGoogleButton />
      </Box>
    </Container>
  );
};

export default Login;
