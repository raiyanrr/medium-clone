import { useDispatch, useSelector } from "react-redux";
import SignInModal from "./SignInModal";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { signInUser, signOutUser } from "@/redux/userSlice";
import { closeSignInModal, openSignInModal } from "@/redux/modalSlice";
import { useRouter } from "next/router";
import Link from "next/link";

function Navbar() {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  async function handleSignOut() {
    await signOut(auth);
    dispatch(signOutUser());
  }

  return (
    <div className="bg-[#ffc017]  border-b border-[#191919] flex justify-center items-center w-full h-[75px] sticky top-0">
      <nav className="flex justify-between py-4 max-w-[1192px] w-full">
        <Link href={"/"}>
          <div className="w-[161px] h-[25px] flex justify-center items-center">
            <img
              className="mt-3 md:-ml-5 flex justify-center items-center"
              src="/assets/medium-logo.png"
            />
          </div>
        </Link>

        <ul className="pr-4 sm:pr-0 flex sm:flex justify-center items-center text-[#292929] space-x-5 ">
          <li className="hidden cursor-not-allowed sm:inline text-[14px]">
            Our story
          </li>
          <li className="hidden cursor-not-allowed sm:inline text-[14px]">
            Membership
          </li>
          <Link href={"/"}>
            <li className="hidden sm:inline text-[14px]">
              Articles
            </li>
          </Link>
          <li
            onClick={() => {
              if (!user.name) {
                dispatch(openSignInModal());
                return;
              } else {
                router.push("/write");
              }
            }}
            className=" cursor-pointer sm:inline text-[14px]"
          >
            Write
          </li>
          {user.name ? (
            <div
              onClick={handleSignOut}
              className="w-9 h-9 rounded-full bg-black flex justify-center items-center cursor-pointer"
            >
              <h1 className="text-white font-bold">{user.name[0]}</h1>
            </div>
          ) : (
            <SignInModal />
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
