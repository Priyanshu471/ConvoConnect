import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { db } from "../Firebase/Firebase";
import { useHistory } from "react-router-dom";
import BG from "../Assets/BG.png";
import ChannelCard from "./ChannelCard";

// console.log("random color ", random_color);
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "50px",
    paddingBottom: "25px",
    color: "#f0f0f0",
  },
  rootChannel: {
    height: "calc(100vh - 185px)",
    position: "relative",
    padding: "15px",
    overflow: "scroll",
  },
  backImg: {
    objectFit: "cover",
    width: "100%",
    borderRadius: "5px",
    marginRight: "100px",
  },
}));

function Home() {
  const classes = useStyles();
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    db.collection("channels")
      .orderBy("channelName", "asc")
      .onSnapshot((snapshot) => {
        setChannels(
          snapshot.docs.map((channel) => ({
            channelName: channel.data().channelName,
            id: channel.id,
          }))
        );
      });
  }, []);
  return (
    <div>
      <Grid container className={classes.root}>
        <img src={BG} alt="background" className={classes.backImg} />
      </Grid>

      <Grid container className={classes.rootChannel}>
        {channels.map((channel) => (
          <ChannelCard name={channel.channelName} id={channel.id} />
        ))}
      </Grid>
    </div>
  );
}

export default Home;
