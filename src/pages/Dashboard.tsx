import { ColumnDef } from "@tanstack/react-table";
import { UserData } from "../type";
import DeleteButton from "../components/DeleteButton";
import UserFormModal from "../components/UserFormModal";
import UserTable from "../components/UserTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  data: UserData[];
}

const Dashboard: React.FC<Props> = ({ data }) => {
  const notifyDeleted = () =>
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
  const notifyCreated = () =>
    toast.success("New User Created", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    const notifyEdited = () =>
    toast.success("User Edited", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const columns: ColumnDef<UserData>[] = [
    {
      header: "No",
      accessorKey: "id",
      footer: "No",
      enableGlobalFilter: false,
      cell: ({ row }) => {
        return row.index + 1;
      },
    },
    {
      header: "Username",
      accessorKey: "username",
      footer: "Username",
      cell: ({ row }) => {
        return (
          <p className="px-6 py-4 font-medium text-[#341948] whitespace-nowrap dark:text-white">
            {row.getValue("username")}
          </p>
        );
      },
    },
    {
      header: "Full Name",
      accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    },
    {
      header: "Balance",
      accessorFn: (row) => `$${row.balance}.00`,
      footer: "Balance",
      enableGlobalFilter: false,
    },
    {
      header: "Role",
      accessorKey: "isAdmin",
      footer: "Role",
      cell: ({ row }) => {
        const isAdmin = row.getValue("isAdmin");
        const text = isAdmin ? "Admin" : "User";
        return text;
      },
    },
    {
      header: "Edit",
      accessorKey: "edit",
      enableGlobalFilter: false,
      footer: "Edit",
      cell: ({ row }) => {
        return <UserFormModal key={row.id} row={row} toast={notifyEdited}/>;
      },
    },
    {
      header: "Delete",
      accessorKey: "delete",
      enableGlobalFilter: false,
      footer: "Delete",
      cell: ({ row }) => <DeleteButton id={row.original.id} />,
    },
  ];

  return (
    <div className="relative h-[56.25vw]">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="h-[5vw]"></div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
        <UserTable data={data} columns={columns} toast={notifyCreated}/>
      </div>
    </div>
  );
};

export default Dashboard;
