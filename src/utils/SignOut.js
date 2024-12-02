import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";
function SignOut() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
    });
}

export default SignOut;
