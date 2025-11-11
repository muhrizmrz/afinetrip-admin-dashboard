import CustomPagination from "../utility/CustomPagination";
import { PiSlidersHorizontalFill } from "react-icons/pi";
import { CiExport } from "react-icons/ci";
import ExampleTrackChild from "./ExampleTrackChild";
import { IoIosArrowDown } from "react-icons/io";
import Breadcrumbs from "../utility/Breadcrumbs";
import { useState } from "react";
import { agentListTableHeader } from "../utility/MenuItems";
import Button from "../utility/Button";

//sample data
const rows = [
  {
    id: "1",
    agency: "Talentmicro",
    agent: "Akilamol joby",
    balance: " 5,75,885",
    credit: " 2,55,335",
  },
  {
    id: "2",
    agency: "Marein Hospital",
    agent: "Arun kumar Pushpangathan",
    balance: " 2,55,335",
    credit: " 2,55,335",
  },
  {
    id: "3",
    agency: "Muhlbauer",
    agent: "Mohammed ameen Maliyakal",
    balance: " 2,50,000",
    credit: " 2,55,335",
  },
  {
    id: "4",
    agency: "Student",
    agent: "Nebil Bava",
    balance: " 2,55,335",
    credit: " 55,200",
  },
  {
    id: "5",
    agency: "Meleparambil",
    agent: "Aswanth Mp",
    balance: " 2,55,335",
    credit: " 28,000",
  },
  {
    id: "6",
    agency: "Muhlbauer",
    agent: "Jumana Haseen",
    balance: " 75,000",
    credit: " 10,000",
  },
  {
    id: "7",
    agency: "Talentmicro",
    agent: "Sam",
    balance: "1,15,200",
    credit: "15,500",
  },
];

export default function DataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  return (
    <div>
      <Breadcrumbs />
      <h1 className="text-xl font-semibold text-[#15144E] mb-6">Agent List</h1>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full md:w-1/2">
          <div className="flex items-center justify-between bg-white px-4 py-3 text-[#15144E] rounded-lg shadow-sm">
            <span className="text-md font-normal">Active</span>
            <span className="text-[#15144e] text-lg font-bold">8</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 bg-white text-[#15144E] rounded-lg shadow-sm">
            <span className="text-md font-normal">In Active</span>
            <span className="text-[#15144e] text-lg font-bold">53</span>
          </div>
          <div className="flex items-center justify-between bg-white px-4 py-3 text-[#15144E] rounded-lg shadow-sm">
            <span className="text-md font-normal">Balance</span>
            <span className="text-[#15144e] text-lg font-bold">0</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          <Button className="flex items-center justify-center gap-2" variant="primary">
            <PiSlidersHorizontalFill size={18} />
            <span className="text-sm font-medium">Filter</span>
          </Button>

          <Button className="flex items-center justify-center gap-2 " variant="outline">
            <span className="text-sm font-medium">Clear Filter</span>
          </Button>
          <div>
            <button className="flex items-center justify-center py-2 text-[#15144E] rounded-lg">
              <a href="" className="flex items-center gap-1">
                <CiExport size={18} />
                <span className="text-md capitalize">export</span>
              </a>
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table-auto min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 border-b border-gray-200 ">
              <tr>
                {agentListTableHeader.map((col) => (
                  <th
                    key={col.field}
                    className={`px-3  py-3 text-md font-semibold text-[#15144e]
                      ${
                        col.headerName === "Agency" ||
                        col.headerName === "Agent"
                          ? "text-left"
                          : ""
                      }`}
                  >
                    {col.headerName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b-3 border-gray-200 text-sm text-[#15144e] text-center"
                >
                  <td className="p-3  ">{row.id}</td>
                  <td className="p-3   font-semibold text-left">
                    {row.agency}
                  </td>
                  <td className="p-3   font-semibold text-left">{row.agent}</td>
                  <td className="p-3 text-gray-500">
                    <div className="flex gap-2 justify-center items-center">
                      {"\u20B9"}
                      {row.balance}
                    </div>
                  </td>
                  <td className="p-3 text-gray-500">
                    <div className="flex gap-2 justify-center items-center">
                      {"\u20B9"}
                      {row.credit}
                    </div>
                  </td>
                  <td className="px-3  py-3 text-sm text-right  text-[#15144e]">
                    <ExampleTrackChild />
                  </td>
                  <td className="px-3  py-3 text-sm text-right text-[#15144e]">
                    <div className="flex gap-[10px] align-center w-full justify-center">
                      <Button className="flex items-center gap-1 " variant="primary">
                        Action
                        <IoIosArrowDown className="text-[#fff]" />
                      </Button>
                      <Button className="flex items-center gap-1 rounded-md text-xs" variant="outline">
                        Finance
                        <IoIosArrowDown className="text-[#15144E] " />
                      </Button>{" "}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
