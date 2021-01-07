import { USER_STATE_CHANGE, GROUP_STATE_CHANGE } from "../constants";
import firebase from "firebase";

export function fetchUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          // console.log(snapshot.data());
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log("does not exist");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };
}

export function fetchGroups() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("groups")
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          let groups = snapshot.docs.map((doc) => {
            // console.log(doc);
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          dispatch({ type: GROUP_STATE_CHANGE, groups: groups });
        } else {
          console.log("not found!");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };
}

export function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("logged user out");
    })
    .catch((error) => {
      console.log(error);
    });
}
