import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { closeSignInModal, openSignInModal } from "@/redux/modalSlice";
import { auth } from "@/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";
import { signInUser } from "@/redux/userSlice";

function SignInModal() {
  const dispatch = useDispatch();
  const open = useSelector((s) => s.modals.signInModal);
  const user = useSelector((s) => s.user);



  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          signInUser({
            uid: user?.uid,
            name: user?.displayName,
            photoUrl: user?.photoURL,
          })
        );
      }
    });

    return unsub;
  }, []);

  async function handleSignIn() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    dispatch(closeSignInModal());
  }

 
  return (
    <div>
      <button
        onClick={() => dispatch(openSignInModal())}
        className={`${user.name && "hidden"} px-4 py-2 hover:bg-black bg-[#191919] text-white rounded-full mr-2`}
        >
        Sign In
      </button>
      <Modal
        open={open}
        onClose={() => dispatch(closeSignInModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <div className="text-black  bg-white w-[300px] h-[400px] flex flex-col justify-center items-center py-4">
          <h1 className="text-3xl font-bold">Join Medium.</h1>
          <button
            onClick={handleSignIn}
            className="px-4 py-2 w-[250px] border-gray-600 border text-black rounded-full mt-4"
          >
            Sign In with Google
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default SignInModal;
