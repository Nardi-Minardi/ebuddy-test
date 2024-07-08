"use client";

import React, { useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import UserListComp from "@/components/UserListComp";
import { fetchUsers, updateUser } from "@/store/actions";
import { useSelector } from "react-redux";
import ModalEdit from "@/components/ModalEdit";

const Home = () => {
  const { loading, error, isAuthenticated } = useSelector(
    (state: any) => state.user
  );
  const { success } = useSelector((state: any) => state.updateUser);
  const [open, setOpen] = useState<boolean>(false);
  const [useSelected, setUserSelected] = useState<Object | null>(null);
  const [users, setUsers] = useState<Array<Object>>([]);

  const handleClose = () => setOpen(false);

  const handleOpen = (user: Object) => {
    setUserSelected(user);
    setOpen(true);
  };

  const handleUpdate = (id: string, name: string) => {
    updateUser(id, name);
    fetchUsers().then((res) => {
      //concatenate the new user to the list
      const newUsers = users.map((user) => {
        if (user.id === id) {
          user.name = name;
        }
        return user;
      });
      setUsers(newUsers);
    });
    setOpen(false);
  };

  useEffect(() => {
    fetchUsers().then((res) => {
      setUsers(res.data);
    });
  }, []);

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
        <Box maxWidth='sm' sx={{ marginBottom: 2 }}>
          <Box maxWidth='sm' sx={{ marginBottom: 2 }}>
            
            <Typography variant='h3' align='center'>
              Welcome
            </Typography>
            <Typography variant='h5' align='center'>
              in E-Buddy Test App
            </Typography>
          </Box>
         
          {isAuthenticated && (
            <UserListComp
              handleOpen={handleOpen}
              loading={loading}
              users={users}
              success={success}
            />
          )}
        </Box>
      </Box>
      <ModalEdit
        selectedUser={useSelected}
        open={open}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
        loading={loading}
      />
    </Container>
  );
};

export default Home;
