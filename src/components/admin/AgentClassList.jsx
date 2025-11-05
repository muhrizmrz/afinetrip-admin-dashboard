import Breadcrumbs from "./Breadcrumbs";
import { MdDelete } from "react-icons/md";

// table Headers
const columns = [
  { field: "id", headerName: "#" },
  { field: "name", headerName: "Name" },
  { field: "description", headerName: "Description" },
  { field: "action", headerName: "Action" },
];

// Dummy Data
const rows = [
  {
    id: "1",
    name: "Silver",
    description: "Superuser",
  },
  {
    id: "2",
    name: "Gold",
    description: "Superuser",
  },
  {
    id: "3",
    name: "Platinum",
    description: "Superuser",
  },
  {
    id: "4",
    name: "Diamond",
    description: "Superuser",
  },
];

export default function AgentClassList() {
  return (
    <div>
      <Breadcrumbs />
      <h1 className="text-xl font-semibold text-[#15144E] mb-6">
        Agent Class List
      </h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table-auto w-full  bg-white border border-gray-200">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.field}
                  className={`px-5 py-5 ${
                    col.headerName === "Action" ? "text-center" : "text-left"
                  }
                   font-semibold text-[#15144E]`}
                >
                  {col.headerName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b-3 border-[#d0d0d0]">
                <td className="px-5  py-3 text-sm ">{row.id}</td>
                <td className="px-5  py-3 text-sm text-[#15144e] font-semibold">
                  {row.name}
                </td>
                <td className="px-5  py-3 text-sm text-gray-400 ">
                  {row.description}
                </td>
                <td className="px-5 py-3 text-center  text-[#d0d0d0] ">
                  <button className="hover:text-red-400 cursor-pointer text-lg">
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
