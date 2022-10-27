import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, FormControl } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment, { now } from "moment/moment";
import { db } from "../firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export default function FormDialog({
  data,
  dataUserSelected,
  variant_modal,
  Icon,
  text_btn,
}) {
  const [open, setOpen] = React.useState(false);
  const initialValues = {
    name: dataUserSelected == null ? "" : dataUserSelected.name,
    id: dataUserSelected == null ? "" : dataUserSelected.id,
    event: dataUserSelected == null ? "" : dataUserSelected.event,
    timestamp:
      dataUserSelected == null
        ? Timestamp.fromDate(new Date()).seconds * 1000
        : dataUserSelected.timestamp,
  };
  const [inputValue, setInputValue] = React.useState(initialValues);
  const namesArray = data.map((op) => op.name);
  const namesEvents = data.map((evnt) => evnt.event);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    e.stopPropagation();
    if (inputValue.id != "") {
      await updateDoc(doc(db, "users", inputValue.id), inputValue);
      console.log("edit entry");
    } else {
      const collectionRef = collection(db, "users");
      await addDoc(collectionRef, {
        name: inputValue.name,
        event: inputValue.event,
        timestamp: inputValue.timestamp,
      });
    }
    setInputValue({
      name: "",
      id: "",
      event: "",
      timestamp: "",
    });
    handleClose();
  };
  return (
    <div>
      <Button
        startIcon={Icon}
        variant={variant_modal}
        onClick={handleClickOpen}
        size={"large"}
        sx={{ marginInline: 1 }}
      >
        {text_btn}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Add data and press btn submit</DialogContentText>
          <FormControl>
            <Autocomplete
              freeSolo
              inputValue={inputValue.name}
              onInputChange={(event, newInputValue) => {
                setInputValue({ ...inputValue, name: newInputValue });
              }}
              id="controllable-states-demo"
              options={namesArray}
              sx={{ width: 500, m: 1 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Full Names Here"
                  required
                  error={inputValue.name === ""}
                  helperText={
                    inputValue.name === "" ? "This Field Can't Empty!" : " "
                  }
                />
              )}
            />
            <Autocomplete
              freeSolo
              inputValue={inputValue.event}
              onInputChange={(event, newInputValue) => {
                setInputValue({ ...inputValue, event: newInputValue });
              }}
              id="controllable-states-demo"
              options={namesEvents}
              sx={{ width: 500, m: 1 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Event "
                  required
                  error={inputValue.event === ""}
                  helperText={
                    inputValue.event === "" ? "This Field Can't Empty!" : " "
                  }
                />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date Event"
                value={
                  inputValue.timestamp == ""
                    ? moment()
                    : new Date(parseInt(inputValue.timestamp))
                }
                onChange={(newValue) => {
                  setInputValue({
                    ...inputValue,
                    timestamp:
                      Timestamp.fromDate(newValue.toDate()).seconds * 1000,
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            size="large"
            sx={{ m: 1 }}
            onClick={(e) => handleSubmit(e)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
