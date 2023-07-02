import { useState } from "react";
import { UserData } from "../type";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import UserFormModal from "./UserFormModal";

interface UserTableProps {
  data: UserData[];
  columns: ColumnDef<UserData>[],
  toast: any
}

const UserTable: React.FC<UserTableProps> = ({ data, columns, toast }) => {
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFiltering,
    state: {
      globalFilter: filtering,
    },
  });

  return (
    <>
      <div className="relative inline-flex items-center w-full justify-between">
        <div className="w-6/12 m-2">
          <input
            type="search"
            id="search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
          />
        </div>
        <UserFormModal toast={toast} key={data.length+1}/>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-[#341948]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} scope="col" className="px-6 py-3">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-[#9388A2] dark:hover:bg-gray-600"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <section className="inline-flex items-center -space-x-px m-5 ">
        <button
          onClick={() => table.setPageIndex(0)}
          className="bg-transparent hover:bg-[#9388A2] text-white font-semibold hover:text-[#341948] py-2 px-4 border border-[#9388A2] hover:border-transparent rounded"
        >
          First
        </button>
        <button
          onClick={() => table.previousPage()}
          className="bg-transparent hover:bg-[#9388A2] text-white font-semibold hover:text-[#341948] py-2 px-4 border border-[#9388A2] hover:border-transparent rounded"
        >
          Prev
        </button>
        <button
          onClick={() => table.nextPage()}
          className="bg-transparent hover:bg-[#9388A2] text-white font-semibold hover:text-[#341948] py-2 px-4 border border-[#9388A2] hover:border-transparent rounded"
        >
          Next
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          className="bg-transparent hover:bg-[#9388A2] text-white font-semibold hover:text-[#341948] py-2 px-4 border border-[#9388A2] hover:border-transparent rounded"
        >
          Last
        </button>
      </section>
    </>
  );
};

export default UserTable;
