import { Delete, Edit, Visibility } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import FormDialog from "./FormUser";
import { useRouter } from "next/router";

export default function CustomToolbarSelect({ selectedRows, data }) {
  const dataUserSelected = selectedRows.data.map((row) => data[row.dataIndex]);
  console.log(dataUserSelected[0].name);
  console.log("-----------------");
  const router = useRouter();

  const handleClickView = (e) => {
    e.stopPropagation();
    console.log("click in edit btn");
    router.push(`/certifieds/${dataUserSelected[0].id}`);
  };
  const handleClickDelete = async (e) => {
    e.stopPropagation();
    try {
      const docRef = doc(db, "users", dataUserSelected[0].id);
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack direction={"row"}>
      <FormDialog
        data={data}
        dataUserSelected={dataUserSelected[0]}
        variant_modal={"outlined"}
        Icon={<Edit />}
        text_btn={"edit"}
      />
      <Button
        variant="outlined"
        onClick={(e) => handleClickDelete(e)}
        color={"error"}
        startIcon={<Delete />}
        size={"large"}
      >
        Delete
      </Button>
      <Button
        variant="outlined"
        onClick={(e) => handleClickView(e)}
        color={"success"}
        startIcon={<Visibility />}
        size={"large"}
        sx={{ marginInline: 1 }}
      >
        View
      </Button>
      s{" "}
    </Stack>
  );
}
