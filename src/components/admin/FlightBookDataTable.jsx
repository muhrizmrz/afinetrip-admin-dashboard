import { BsThreeDotsVertical } from "react-icons/bs";
import CustomPagination from "../admin/CustomPagination";
import { useState } from "react";
import { flightBookTableHeader } from "./MenuItems";

const rows = [
  {
    id: "AO25226310",
    name: "Sadhik",
    flight_no: "G9 - 606",
    from: "WAW",
    to: "COK",
    departure: "27-10-2025, 08:55",
    arrival: "28-10-2025, 06:40",
    status: "Confirmed",
  },
  {
    id: "AO25226311",
    name: "Mohammed Sadik",
    flight_no: "G9 - 606",
    from: "WAW",
    to: "COK",
    departure: "27-10-2025, 08:55",
    arrival: "28-10-2025, 06:40",
    status: "Pending",
  },
  {
    id: "AO25226312",
    name: "Mohammed Sadik",
    flight_no: "G9 - 606",
    from: "WAW",
    to: "COK",
    departure: "27-10-2025, 08:55",
    arrival: "28-10-2025, 06:40",
    status: "Cancelled",
  },
  {
    id: "AO25226313",
    name: "Mohammed Sadik",
    flight_no: "G9 - 606",
    from: "WAW",
    to: "COK",
    departure: "27-10-2025, 08:55",
    arrival: "28-10-2025, 06:40",
    status: "Confirmed",
  },
  {
    id: "AO25226314",
    name: "Mohammed Sadik",
    flight_no: "G9 - 606",
    from: "WAW",
    to: "COK",
    departure: "27-10-2025, 08:55",
    arrival: "28-10-2025, 06:40",
    status: "Confirmed",
  },
  {
    id: "AO25226315",
    name: "Mohammed Sadik",
    flight_no: "G9 - 606",
    from: "WAW",
    to: "COK",
    departure: "27-10-2025, 08:55",
    arrival: "28-10-2025, 06:40",
    status: "Confirmed",
  },
  {
    id: "AO25226316",
    name: "Mohammed Sadik",
    flight_no: "G9 - 606",
    from: "WAW",
    to: "COK",
    departure: "27-10-2025, 08:55",
    arrival: "28-10-2025, 06:40",
    status: "Cancelled",
  },
];

export default function DataTable() {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [childCheckboxes, setChildCheckboxes] = useState(rows.map(() => false));
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const handleAllChecked = (e) => {
    const checked = e.target.checked;
    setIsAllChecked(checked);
    setChildCheckboxes(childCheckboxes.map(() => checked));
  };

  const handleChildChecked = (index) => {
    const updatedCheckBoxes = [...childCheckboxes];
    updatedCheckBoxes[index] = !updatedCheckBoxes[index];
    setChildCheckboxes(updatedCheckBoxes);
    setIsAllChecked(updatedCheckBoxes.every((checked) => checked));
  };
  return (
    <div>
      <div>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table-auto min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 border-b border-gray-200 text-center">
              <tr>
                <th className="px-3 py-3 text-md font-semibold text-[#15144e]">
                  <input
                    type="checkbox"
                    checked={isAllChecked}
                    onChange={handleAllChecked}
                  />
                </th>
                {flightBookTableHeader.map((col) => (
                  <th
                    key={col.field}
                    className="px-3 py-3 text-md font-semibold text-[#15144e] "
                  >
                    {col.headerName}
                  </th>
                ))}
                <th className="px-3 py-3 text-md font-semibold text-[#15144e]">
                </th>
              </tr>
            </thead>

            <tbody className=" border-b border-gray-200 text-center text-xs">
              {currentRows.map((row, i) => {
                const actualIndex = indexOfFirstRow + i;
                return (
                  <tr key={row.id} className="p-6">
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={childCheckboxes[actualIndex]}
                        onChange={() => handleChildChecked(actualIndex)}
                      />
                    </td>
                    <td className="p-2">{row.id}</td>
                    <td className="p-2">{row.name}</td>
                    <td className="p-2">{row.flight_no}</td>
                    <td className="p-2">{row.from}</td>
                    <td className="p-2">{row.to}</td>
                    <td className="p-2">{row.departure}</td>
                    <td className="p-2">{row.arrival}</td>
                    <td className="p-2">
                      <div
                        className={`p-2 rounded-full ${
                          row.status === "Confirmed"
                            ? "bg-[#e8ffe3] text-[#32c900]"
                            : row.status === "Pending"
                            ? "bg-[#fff6da] text-[#fcbe00]"
                            : row.status === "Cancelled"
                            ? "bg-[#ffecec] text-[#ff2020]"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {row.status}
                      </div>
                    </td>
                    <td className="p-2">
                      <button className="rounded-full hover:bg-neutral-100 cursor-pointer p-2 transition duration-300">
                        <BsThreeDotsVertical
                          style={{ fontSize: "14px", color: "#B3B3B3" }}
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
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
