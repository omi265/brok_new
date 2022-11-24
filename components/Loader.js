import { async } from "@firebase/util";
import { useEffect } from "react";

let data = {};

export default function loadData() {
  useEffect(() => {
    async function fetchData() {
      const userDetails = ref(db, "users/" + auth.currentUser.uid);
      await onValue(userDetails, (snapshot) => {
        data = snapshot.val();
        console.log(data);
      });
    }
  }, []);
}
