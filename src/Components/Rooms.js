import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import { db } from "../Firebase/Firebase";
import { useHistory } from "react-router-dom";
import { IoMdChatboxes } from "react-icons/io";
import { BiHash } from "react-icons/bi";
import CreateRoom from "./CreateRoom";
import { Slide } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  iconDesign: {
    fontSize: "1.5em",
    color: "#2207f0",
  },
  primary: {
    color: "#2207f0",
  },
}));

function Rooms() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [channelList, setChannelList] = useState([]);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const history = useHistory();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    db.collection("channels")
      .orderBy("channelName", "asc")
      .onSnapshot((snapshot) => {
        setChannelList(
          snapshot.docs.map((channel) => ({
            channelName: channel.data().channelName,
            id: channel.id,
          }))
        );
      });
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const goToChannel = (id) => {
    history.push(`/channel/${id}`);
  };

  const manageCreateRoomModal = () => {
    setShowCreateRoom(!showCreateRoom);
  };

  const handleAlert = () => {
    setAlert(!alert);
  };

  const addChannel = (cName) => {
    if (cName) {
      cName = cName.toLowerCase().trim();
      if (cName === "") {
        handleAlert();
        return;
      }

      for (var i = 0; i < channelList.length; i++) {
        if (cName === channelList[i].channelName) {
          handleAlert();
          return;
        }
      }

      db.collection("channels")
        .add({ channelName: cName.toLowerCase() })
        .then((res) => {
          console.log("added new channel");
        })
        .then((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert}
        autoHideDuration={5000}
        onClose={handleAlert}
        severity="error"
        TransitionComponent={Slide}
        message="Room Name Already Exits!!"
        key={Slide}
      ></Snackbar>

      {showCreateRoom ? (
        <CreateRoom create={addChannel} manage={manageCreateRoomModal} />
      ) : null}
      <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
        <ListItemText primary="Create New Room" />
        <IconButton edge="end" aria-label="add" onClick={manageCreateRoomModal}>
          <AddIcon className={classes.primary} />
        </IconButton>
      </ListItem>
      <Divider />

      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <IoMdChatboxes className={classes.iconDesign} />
          </ListItemIcon>
          <ListItemText primary="Community" style={{ color: "#8e9297" }} />
          {open ? (
            <ExpandLess className={classes.primary} />
          ) : (
            <ExpandMore className={classes.primary} />
          )}
        </ListItem>

        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            {channelList.map((channel) => (
              <ListItem
                key={channel.id}
                button
                className={classes.nested}
                onClick={() => goToChannel(channel.id)}
                style={{ background: "#1a2036" }}
              >
                <ListItemIcon style={{ minWidth: "30px" }}>
                  <BiHash
                    className={classes.iconDesign}
                    style={{ color: "#240dd1" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    channel.channelName === channel.channelName.substr(0, 12)
                      ? channel.channelName
                      : `${channel.channelName.substr(0, 10)}...`
                  }
                  style={{ color: "#dcddde" }}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );
}

export default Rooms;
