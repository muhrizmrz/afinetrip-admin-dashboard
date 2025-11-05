import CustomPagination from "../admin/CustomPagination";
import { PiSlidersHorizontalFill } from "react-icons/pi";
import { CiExport } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import Breadcrumbs from "./Breadcrumbs";
import { useState } from "react";
import { agentDepositReqListHeader } from "./MenuItems";

//sample data
const rows = [
  {
    id: "67",
    entryDate: "25-09-2025",
    agentId: "AR578499",
    transDate: "25-09-2025",
    depAmt: "45,000",
    accNo: "11258794522",
    bankName: "Canara Bank",
    depType: "Savings",
  },
  {
    id: "66",
    entryDate: "13-08-2025",
    agentId: "AR578498",
    transDate: "14-08-2025",
    depAmt: "2,45,000",
    accNo: "14632578945",
    bankName: "SBI Bank",
    depType: "Savings",
  },
  {
    id: "65",
    entryDate: "03-08-2025",
    agentId: "AR578497",
    transDate: "03-08-2025",
    depAmt: "75,000",
    accNo: "536427891546",
    bankName: "State Bank",
    depType: "Savings",
  },
  {
    id: "64",
    entryDate: "14-07-2025",
    agentId: "AR578496",
    transDate: "15-07-2025",
    depAmt: "1,52,000",
    accNo: "48103479023",
    bankName: "HDFC Bank",
    depType: "Savings",
  },
  {
    id: "62",
    entryDate: "21-09-2025",
    agentId: "AR578495",
    transDate: "21-09-2025",
    depAmt: "78,632",
    accNo: "85766624587",
    bankName: "federal Bank",
    depType: "Savings",
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
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
        <h1 className="text-2xl font-semibold text-[#15144E]">
          Agent Deposit Request List
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#15144E] text-[#fff] rounded-lg cursor-pointer">
            <PiSlidersHorizontalFill size={18} />
            <span className=" font-medium">Filter</span>
          </button>

          <button className="flex items-center justify-center gap-2 bg-transparent border border-[#15144E] px-4 py-2 text-[#15144E] rounded-lg cursor-pointer">
            <span className=" font-medium">Clear Filter</span>
          </button>
          <div>
            <button className="flex items-center justify-center py-2 text-[#15144E] rounded-lg">
              <a href="" className="flex items-center gap-1">
                <CiExport size={18} />
                <span className=" capitalize">export</span>
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
                {agentDepositReqListHeader.map((col) => (
                  <th
                    key={col.field}
                    className={`px-3  py-3 text-md font-semibold text-[#15144e]
                      `}
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
                  className="border-b-3 border-gray-200 text-sm text-gray-500 text-center"
                >
                  <td className="p-3  ">{row.id}</td>
                  <td className="p-3   font-semibold ">{row.entryDate}</td>
                  <td className="p-3   font-semibold text-[#15144E]
                  
                   ">{row.agentId}</td>
                  <td className="p-3 ">{row.transDate}</td>
                  <td className="p-3" >
                    <div className="flex gap-2 justify-center items-center">
                      {"\u20B9"}
                      {row.depAmt}
                    </div>
                  </td>
                  <td className="px-3  py-3 text-sm   ">
                    {row.accNo}
                  </td>
                  <td className="px-3  py-3 text-sm   ">
                    {row.bankName}
                  </td>
                  <td className="px-3  py-3 text-sm   ">
                    {row.depType}
                  </td>
                  <td className="px-3  py-3 text-sm text-right text-[#15144e]">
                    <div className="flex gap-[10px] align-center w-full justify-center">
                      <button className="flex items-center gap-1 rounded-md text-xs bg-[#15144E] text-white  border border-[#15144E] p-1.5 cursor-pointer">
                        Action
                        <IoIosArrowDown className="text-[#fff]" />
                      </button>
                      <button className="flex items-center gap-1 rounded-md text-xs bg-white text-[#15144E] border border-[#15144E] p-1.5 cursor-pointer">
                        Finance
                        <IoIosArrowDown className="text-[#15144E] " />
                      </button>{" "}
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
