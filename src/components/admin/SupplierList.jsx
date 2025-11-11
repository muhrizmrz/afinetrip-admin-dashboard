import CustomPagination from "../utility/CustomPagination";
import ExampleTrackChild from "./ExampleTrackChild";
import Breadcrumbs from "../utility/Breadcrumbs";
import { useState } from "react";
import { SupplierListTableHeader } from "../utility/MenuItems";
import Button from "../utility/Button";

//sample data
const rows = [
  {
    id: "1",
    fullName: "Trav Clan API",
    shortName: "travclan",
    module: "Flight",
    index: "1",
  },
  {
    id: "2",
    fullName: "Get Fares",
    shortName: "getfares",
    module: "Flight",
    index: "2",
  },
  {
    id: "3",
    fullName: "Trav Clan API",
    shortName: "travclan",
    module: "Hotel",
    index: "1",
  },
  {
    id: "4",
    fullName: "Get Fares",
    shortName: "getfares",
    module: "Flight",
    index: "4",
  },
  {
    id: "5",
    fullName: "Trav Clan API",
    shortName: "travclan",
    module: "Hotel",
    index: "1",
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
      <h1 className="text-xl font-semibold text-[#15144E] mb-6">
        Supplier List
      </h1>

      <div>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table-auto min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 border-b border-gray-200 ">
              <tr>
                {SupplierListTableHeader.map((col) => (
                  <th
                    key={col.field}
                    className={`px-3  py-3 text-md font-semibold text-[#15144e] ${
                      col.field === "fullName" || col.field === "shortName"
                        ? "text-left"
                        : ""
                    } `}
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
                    {row.fullName}
                  </td>
                  <td className="p-3   text-left text-gray-500">
                    {row.shortName}
                  </td>
                  <td className="p-3 text-gray-500">{row.module}</td>

                  <td className="px-3  py-3 text-sm text-right  ">
                    <ExampleTrackChild />
                  </td>
                  <td className="p-3 text-gray-500">{row.index}</td>
                  <td className="px-3  py-3 text-sm  ">
                    <Button variant="primary">Balance</Button>
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
