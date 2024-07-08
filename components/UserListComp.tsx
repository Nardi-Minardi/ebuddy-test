import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { fetchUsers } from "@/store/actions";
import { ListItemSecondaryAction, Skeleton } from "@mui/material";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const UserListComp: React.FC = (props: any) => {
  const { users, loading, handleOpen, success } = props;
  const [dense, setDense] = useState<boolean>(false);
  const [secondary, setSecondary] = useState<boolean>(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography sx={{ mt: 4, mb: 2 }} variant='h6' component='div'>
            List of Users
          </Typography>
          {success && (
            <Typography color='success.main' level='title-sm' noWrap>
              User update successfully
            </Typography>
          )}
          <Demo>
            {loading ? (
              Array.from(new Array(5)).map((item, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Skeleton variant='circular' width={40} height={40} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Skeleton />}
                    secondary={secondary ? <Skeleton /> : null}
                  />
                </ListItem>
              ))
            ) : (
              <List dense={dense}>
                {users.map((user: any) => {
                  const labelId = `checkbox-list-secondary-label-${user.id}`;
                  return (
                    <ListItem key={user.id} button>
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar n°${user.id}`}
                          src={
                            user.avatar
                              ? user.avatar
                              : `https://i.pravatar.cc/150?img=${user.id}`
                          }
                        />
                      </ListItemAvatar>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <ListItemText
                          id={labelId}
                          primary={`ID: ${user.id}`}
                          secondary={secondary ? "Secondary text" : null}
                        />
                        <ListItemText
                          id={labelId}
                          primary={`Name: ${user.name}`}
                          secondary={secondary ? "Secondary text" : null}
                        />
                        <ListItemText
                          id={labelId}
                          primary={`Email: ${user.email}`}
                          secondary={secondary ? "Secondary text" : null}
                        />
                      </Box>

                      <ListItemSecondaryAction>
                        <IconButton edge='end' aria-label='edit'>
                          <EditIcon 
                          onClick={() => handleOpen(user)}
                          />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            )}
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserListComp;
