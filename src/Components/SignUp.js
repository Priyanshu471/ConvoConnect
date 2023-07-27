import React from "react";
import Button from "@material-ui/core/Button";
import { FcGoogle } from "react-icons/fc";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import lg from "../Assets/lg.svg";
import Topography from "@material-ui/core/Typography";
import { auth, provider } from "../Firebase/Firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0 0 15px rgb(7 15 63 / 33%)",
    backgroundColor: "#03002bb5",
    color: "white",
    borderRadius: "20px",
  },
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "25px",
    paddingTop: "35px",
  },
  mainImg: {
    width: "100%",
    height: "auto",
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    color: "#d9d9d9",
    backgroundColor: "#02054a",
  },
}));

function SignUp() {
  const classes = useStyles();

  const login = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        console.log("Success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container
      component="div"
      maxWidth="xs"
      className={classes.root}
      style={{}}
    >
      <div className={classes.paper}>
        <div
          style={{
            backgroundColor: "#03002bb4",
            padding: "10px",
            borderRadius: "20px",
          }}
        >
          <img src={lg} className={classes.mainImg} alt="signup img" />
        </div>
        <Topography
          variant="h4"
          style={{ marginTop: "20px", fontSize: "25px" }}
        >
          Sign in to ConvoConnect
        </Topography>
        <Button
          variant="filled"
          color="primary"
          className={classes.submit}
          startIcon={<FcGoogle />}
          onClick={login}
        >
          Sign In With Google
        </Button>
      </div>
    </Container>
  );
}

export default SignUp;
