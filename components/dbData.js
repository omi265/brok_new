import { onValue, ref } from "firebase/database";
import { db, auth } from "../Firebase";

let data = {};

export default function dbData() {
  const userDetails = ref(db, "users/" + auth.currentUser.uid);
  onValue(userDetails, (snapshot) => {
    data = snapshot.val();
    // console.log(data);
  });

  return data;
}
