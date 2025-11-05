import CustomPagination from "../admin/CustomPagination";
import { PiSlidersHorizontalFill } from "react-icons/pi";
import { CiExport } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import Breadcrumbs from "./Breadcrumbs";
import { useState } from "react";
import { flightBookingListHeader } from "./MenuItems";
import { FaArrowRightLong } from "react-icons/fa6";

//sample data
const rows = [
  {
    tradeId: 6,
    date: "02 Sep 2025",
    type: "Return",
    dPNR: "HGVBJL",
    departureStatus: "Success",
    fare: 71801,
    category: "B2B",
    timestamp: "03:42 PM, 25 Jul 2025",
    returnDate: "31 Sep 2025",
    from: "Warsaw",
    to: "Warsaw",
    returnStatus: "Failed",
  },
  {
    tradeId: 5,
    date: "30 Aug 2025",
    type: "One way",
    dPNR: "JKNMBD",
    departureStatus: "Failed",
    fare: 82024,
    category: "B2B",
    timestamp: "05:41 PM, 22 Jul 2025",
    from: "Warsaw",
    to: "Hanoi",
    returnStatus: "Failed",
  },
  {
    tradeId: 4,
    date: "18 Jul 2025",
    type: "One way",
    dPNR: "eFAKUV",
    fare: 32342,
    category: "B2B",
    timestamp: "04:09 PM, 22 Jul 2025",
    from: "New York",
    to: "Dubai",
  },
  {
    tradeId: 3,
    date: "25 Jul 2025",
    type: "One way",
    dPNR: "FVCDSA",
    departureStatus: "Failed",
    fare: 32342,
    category: "B2B",
    timestamp: "03:51 PM, 22 Jul 2025",
    from: "New York",
    to: "Dubai",
  },
  {
    tradeId: 2,
    date: "23 Jun 2025",
    type: "One way",
    dPNR: "PLKVCX",
    departureStatus: "Failed",
    fare: 29837,
    category: "B2B",
    timestamp: "01:26 PM, 14 Jul 2025",
    from: "Warsaw",
    to: "Singapore",
  },
  {
    tradeId: 1,
    date: "11 Jun 2025",
    type: "Return",
    dPNR: "RTFCVG",
    departureStatus: "Success",
    fare: 9567,
    category: "B2B",
    timestamp: "07:26 PM, 03 Jun 2025",
    from: "Calicut",
    to: "Calicut",
  },
];

export default function DataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const departureSuccess = rows.filter((row)=>row.departureStatus === 'Success').length;
  const departureFailure = rows.filter((row)=>row.departureStatus === 'Failed').length;
  const returnSuccess = rows.filter((row)=>row.returnStatus === 'Success').length;
  const returnFailure = rows.filter((row)=>row.returnStatus === 'Failed').length;
  const totalFailure = departureFailure + returnFailure;
  const totalSuccess = departureSuccess + returnSuccess;


  return (
    <div>
      <Breadcrumbs />
      <h1 className="text-xl font-semibold text-[#15144E] mb-6">
        Flight Booking List
      </h1>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full md:w-1/2">
          <button className="flex items-center justify-between bg-white px-4 py-3 text-[#15144E] rounded-lg shadow-sm">
            <span className="text-md font-normal">Success</span>
            <span className="text-[#15144e] text-lg font-bold">{totalSuccess}</span>
          </button>
          <button className="flex items-center justify-between px-4 py-3 bg-white text-[#15144E] rounded-lg shadow-sm">
            <span className="text-md font-normal">Failed</span>
            <span className="text-[#15144e] text-lg font-bold">{totalFailure}</span>
          </button>
          <button className="flex items-center justify-between bg-white px-4 py-3 text-[#15144E] rounded-lg shadow-sm">
            <span className="text-md font-normal">Pending</span>
            <span className="text-[#15144e] text-lg font-bold">0</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#15144E] text-[#fff] rounded-lg cursor-pointer">
            <PiSlidersHorizontalFill size={18} />
            <span className="text-sm font-medium">Filter</span>
          </button>

          <button className="flex items-center justify-center gap-2 bg-transparent border border-[#15144E] px-4 py-2 text-[#15144E] rounded-lg cursor-pointer">
            <span className="text-sm font-medium">Clear Filter</span>
          </button>
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
                {flightBookingListHeader.map((col) => (
                  <th
                    key={col.field}
                    className={`px-3  py-3 text-md font-semibold text-[#15144e] ${
                      col.field === "basic" || col.field === "segment" || col.field === "booking"
                        ? "text-left"
                        : ""
                    }`}
                  >
                    {col.headerName}
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row) => (
                <tr
                  key={row.tradeId}
                  className="border-b-3 border-gray-200 text-sm text-gray-500 text-center"
                >
                  <td className="p-3  ">
                    <div className="flex flex-col gap-1 text-left">
                      <span className="font-semibold text-[#15144e]">
                        Trade ID : {row.tradeId}
                      </span>
                      <span>{row.timestamp}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-col gap-1">
                      {row.date && (
                        <div>
                          <span className="font-semibold text-[#15144E]">
                            D :
                          </span>
                          <span className="pl-1">{row.date}</span>
                        </div>
                      )}
                      {row.returnDate && (
                        <div>
                          <span className="font-semibold text-[#15144E]">
                            R :
                          </span>
                          <span className="pl-1">{row.returnDate}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-col gap-1 text-left ">
                      <div className="font-semibold text-[#15144E]">
                        <span>Type : </span>
                        <span>{row.type}</span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <span>{row.from}</span>
                        <FaArrowRightLong />
                        <span>{row.to}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 ">
                    <div>
                      <span>D :</span>
                      <span className="pl-1">{row.dPNR}</span>
                    </div>
                    {row.rPNR && (
                      <div>
                        <span>R :</span>
                        <span className="pl-1">{row.rPNR} </span>
                      </div>
                    )}
                  </td>
                  <td className="p-3  ">
                    <div className="flex-flex-col gap-1 text-left">
                      {row.departureStatus && (
                        <div
                          className={`${
                            row.departureStatus === "Failed"
                              ? "text-red-600  "
                              : "text-green-600  "
                          }`}
                        >
                          <span>D :</span>
                          <span className="pl-1">{row.departureStatus}</span>
                        </div>
                      )}
                      {row.returnStatus && (
                        <div
                          className={`${
                            row.returnStatus === "Failed"
                              ? "text-red-600  "
                              : "text-green-600  "
                          }`}
                        >
                          <span>R :</span>
                          <span className="pl-1">{row.returnStatus}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-3 ">
                    <div className="flex flex-col gap-1">
                      <p>
                        <span>{"\u20B9"} </span>
                        <span>{row.fare}</span>
                      </p>
                      <span>({row.category})</span>
                    </div>
                  </td>
                  <td className="px-3  py-3 text-sm text-right text-[#15144e]">
                    <div className="flex gap-[10px] align-center w-full justify-center">
                      <button className="rounded-md text-xs bg-[#15144E] text-white  px-4 py-2 cursor-pointer">
                        Agent
                      </button>
                    </div>
                  </td>
                  <td>
                    <button className="flex items-center gap-1 rounded-md text-xs bg-white text-[#15144E] cursor-pointer">
                      More
                      <IoIosArrowDown className="text-[#15144E] " />
                    </button>
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
