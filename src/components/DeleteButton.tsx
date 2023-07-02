import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { baseURL } from "../api/api";
import { useReadLocalStorage } from "usehooks-ts";
import useUsers from "../hooks/useUsers";
import { toast } from "react-toastify";

interface Props {
  id: number;
}

const DeleteButton: React.FC<Props> = ({ id }) => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const { mutate } = useUsers();
  const token = useReadLocalStorage("access_token");
  const props = { openModal, setOpenModal };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${baseURL}/users/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      if (response.status == 200) {
        mutate();
        toast.error("User Deleted", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        props.setOpenModal(undefined);
      } else {
        throw new Error("Delete Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        className="bg-[#9388A2] hover:bg-red-700"
        onClick={() => props.setOpenModal("pop-up")}
      >
        Delete
      </Button>
      <Modal
        show={props.openModal === "pop-up"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <ExclamationCircleIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this User?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  handleDelete();
                  props.setOpenModal(undefined);
                }}
              >
                Yes, I'm sure
              </Button>
              <Button
                color="gray"
                onClick={() => props.setOpenModal(undefined)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteButton;
