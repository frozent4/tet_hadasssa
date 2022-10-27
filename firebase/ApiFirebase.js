import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export const getUsers = () => {};
export const deleteUser = async (id) => {
  const docRef = doc(db, "users", id);
  await deleteDoc(docRef);
};
