import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { db } from "../Firebase/Firebase";
import { BiEditAlt } from "react-icons/bi";

function EditProfile({ toggler, alert }) {
  const [open, setOpen] = useState(true);
  const [userName, setUserName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [image, setImage] = useState("");

  const handleClose = () => {
    setOpen(false);
    toggler();
  };
  const updateProfile = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(uid)
      .update({
        displayName: displayName,
      })
      .then((res) => {
        alert();
      })
      .catch((err) => {
        console.log(err);
      });

    setOpen(false);
    toggler();
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userDetails"));
    setUserName(userData.name);
    setDisplayName(userData.displayName);
    setEmail(userData.email);
    setImage(userData.photoURL);
    setUid(userData.uid);
  }, []);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div style={{ display: "flex", padding: "5px 20px" }}>
          <img
            src={image}
            alt="Dp"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              marginTop: "6px",
              marginLeft: "5px",
              border: "2px solid#121933",
              boxShadow: "3px 5px 5px #121933",
            }}
          />
          <DialogTitle
            id="form-dialog-title"
            style={{ marginLeft: "15px", paddingLeft: "0" }}
          >
            Edit Your Name
          </DialogTitle>
        </div>
        <DialogContent>
          <form autoComplete="off">
            <TextField
              id="filled-basic"
              label="Name"
              fullWidth
              margin="normal"
              variant="filled"
              disabled
              value={userName}
              style={{
                backgroundColor: "rgb(45, 45, 73)",
                borderRadius: "5px",
                color: "#a6a6a6",
              }}
            />
            <TextField
              id="filled-basic"
              label="Email"
              fullWidth
              margin="normal"
              variant="filled"
              disabled
              value={email}
              style={{
                backgroundColor: "rgb(45, 45, 73)",
                borderRadius: "5px",
                color: "#a6a6a6",
              }}
            />

            <TextField
              id="filled-basic"
              label="Display Name"
              fullWidth
              margin="normal"
              variant="filled"
              value={displayName}
              style={{
                backgroundColor: "rgb(45, 45, 73)",
                borderRadius: "5px",
              }}
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "white" }}>
            Cancel
          </Button>
          <Button
            onClick={(e) => updateProfile(e)}
            color="primary"
            variant="contained"
          >
            <BiEditAlt style={{ fontSize: "21px" }} />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditProfile;
