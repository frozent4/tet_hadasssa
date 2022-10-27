import React, { forwardRef, useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import CustomToolbarSelect from "./CustomToolbarSelect2";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import FormDialog from "./FormUser";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import moment from "moment/moment";
import { Box } from "@mui/material";

function Example() {
  const [stp, setStp] = useState("replace");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);
  const printUsers = users.map((user) => ({
    ...user,
    timestamp: moment(new Date(user.timestamp)).format("DD MMMM, YYYY"),
    daysEvent: Math.floor(Math.random() * (15 - 5 + 1) + 5),
  }));

  const columns = [
    { name: "name", label: "Full Name User" },
    { name: "timestamp", label: "Date Event" },
    { name: "daysEvent", label: "Days Event" },
    { name: "event", label: "Event Name" },
  ];

  const options = {
    filter: true,
    selectableRows: "single",
    selectableRowsOnClick: true,
    filterType: "dropdown",
    responsive: "vertical",
    rowsPerPage: 10,
    selectToolbarPlacement: stp,
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <CustomToolbarSelect selectedRows={selectedRows} data={users} />
    ),
  };

  return (
    <>
      <Box marginY={1}>
        <FormDialog
          data={users}
          ID={null}
          variant_modal={"contained"}
          Icon={<AddCircleOutlineOutlined />}
          text_btn={"Add Users"}
        />
      </Box>

      <MUIDataTable
        title={"USERS TABLE"}
        data={printUsers}
        columns={columns}
        options={options}
      />
    </>
  );
}

export default Example;
