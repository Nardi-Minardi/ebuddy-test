"use client";

import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalEdit: React.FC = (props: any) => {
  const { open, handleClose, selectedUser, handleUpdate, loading } = props;
  const [name, setName] = useState<string>("");

  useEffect(() => {
    setName(selectedUser?.name);
  }, [selectedUser]);

  const onChangeName = (e: string) => {
    if (e) {
      setName(e);
    } else {
      setName(selectedUser?.name);
    }
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Edit User
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: 2,
          }}>
          <Input
            defaultValue={selectedUser?.name}
            placeholder='Name'
            fullWidth
            onChange={(e) => onChangeName(e.target.value)}
          />
          {!name && (
            <Typography variant='caption' color='error'>
              Name is required
            </Typography>
          )}
        </Box>
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleUpdate(selectedUser?.id, name)}>
          {loading ? "Loading..." : "Update"}
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalEdit;
