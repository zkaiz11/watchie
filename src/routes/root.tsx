import { Navigate, Outlet } from "react-router-dom";
import InfoModal from "../components/InfoModal";
import Navbar from "../components/Navbar";
import useInfoModalStore from "../hooks/useInfoModalStore";
import useCurrentUser from "../hooks/useCurrentUser";

export const Root = () => {
  const {isOpen, closeModal} = useInfoModalStore();
  const { data: currentUser } = useCurrentUser();
  
  if (!currentUser) {
    return <Navigate to="/" replace={true} />
  }
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar user={currentUser}/>
      <Outlet/>
    </>
  )
}