import axios from "axios";
import { Button, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { baseURL } from "../api/api";
import { useReadLocalStorage } from "usehooks-ts";
import useUsers from "../hooks/useUsers";

interface Props {
  row?: any;
  toast: any;
}
enum RoleEnum {
  User = "User",
  Admin = "Admin",
}

interface IFormInput {
  username: string;
  first_name: string;
  last_name: string;
  role: RoleEnum;
  password: string;
  password2: string;
  balance: number;
}

const UserFormModal: React.FC<Props> = ({ row, toast }) => {
  const [error, setError] = useState<string | null>(null);
  const { mutate } = useUsers();
  const token = useReadLocalStorage("access_token");
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  const { register, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      username: row?.original.username,
      first_name: row?.original.first_name as string,
      last_name: row?.original.last_name as string,
      role: row?.original.isAdmin ? RoleEnum.Admin : RoleEnum.User,
      balance: row?.original.balance,
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    if (row) {
      const req_body = {
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        isAdmin: data.role === "Admin" ? true : false,
        password: data.password,
        confirmPassword: data.password2,
        balance: data.balance,
      };
      try {
        const response = await axios.put(
          `${baseURL}/users/${row.original.id}`,
          req_body,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        console.log(response.status)
        props.setOpenModal(undefined);
        mutate();
        toast();
      } catch (err) {
        const error = err as any;
        setError(error.response?.data?.message);
        console.log(error);
      }
    } else {
      const req_body = {
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        isAdmin: data.role === "Admin" ? true : false,
        password: data.password,
        confirmPassword: data.password2,
        balance: data.balance,
      };
      try {
        console.log('start')
        const response = await axios.post(
          `${baseURL}/users/addnewuser`,
          req_body,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        props.setOpenModal(undefined);
        mutate();
        console.log(response.status)
        toast();
      } catch (err) {
        console.log('get err')
        const error = err as any;
        setError(error.response?.data?.message);
        console.log(error);
        mutate();
        toast();
        props.setOpenModal(undefined);
      }
    }
  };
  return (
    <>
      {row ? (
        <Button
          className="bg-[#9388A2] hover:bg-[#341948]"
          onClick={() => {
            props.setOpenModal("form-elements");
          }}
        >
          Edit
        </Button>
      ) : (
        <button
          onClick={() => {
            props.setOpenModal("form-elements");
          }}
          className="m-2 bg-transparent hover:bg-[#341948] text-white font-semibold hover:text-white py-2 px-4 border-4 border-[#341948] hover:border-transparent rounded"
        >
          Add New User
        </button>
      )}
      <Modal
        show={props.openModal === "form-elements"}
        size="md"
        popup
        onClose={() => {
          setError(null);
          props.setOpenModal(undefined);
        }}
      >
        <Modal.Header />
        <Modal.Body>
          {error != null && (
            <div
              className="animate-shaking flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
              role="alert"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 inline w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">!</span> {error}
              </div>
            </div>
          )}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {row ? "Edit User Information" : "Create New User"}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-2 block">
                <label>Username</label>
              </div>
              <TextInput {...register("username")} />
              <div className="flex justify-between">
                <div className="items-center gap-2 space-y-2">
                  <label>First Name</label>
                  <TextInput {...register("first_name")} />
                </div>
                <div className="items-center gap-2 space-y-2">
                  <label>Last Name</label>
                  <TextInput {...register("last_name")} />
                </div>
              </div>
              <label className="block my-2 text-sm font-medium text-gray-900 dark:text-white">
                Role
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("role")}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
              <div className="my-2 block">
                <label>Password</label>
              </div>
              <TextInput {...register("password")} />
              <div className="my-2 block">
                <label>Re-type Password</label>
              </div>
              <TextInput {...register("password2")} />
              <div className="my-2 block">
                <label>Balance</label>
              </div>
              <TextInput {...register("balance")} />
              <button className="my-6 bg-[#341948] hover:bg-[#9388A2] text-white font-semibold hover:text-[#341948] py-2 px-4 border border-[#9388A2] hover:border-transparent rounded">
                <input type="submit" />
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserFormModal;
