import { BsThreeDotsVertical } from "react-icons/bs";
import CustomPagination from "../utility/CustomPagination";
import { useState } from "react";
import { hotelBookTableHeader } from "../utility/MenuItems";
import { FaStar } from "react-icons/fa";

const rows = [
  {
    name: "Radisson Blu Plaza Hotel",
    rating: 4,
    location: "Dubai",
    price: "8,500",
    amenities: "WiFi, breakfast",
    review: "4.5",
    distance: "12 km",
    status: "Confirmed",
  },
  {
    name: "Address Sky View",
    rating: 3,
    location: "Dubai",
    price: "8,500",
    amenities: "WiFi, breakfast",
    review: "4.5",
    distance: "12 km",
    status: "Confirmed",
  },
  {
    name: "Public Hotel NIC",
    rating: 2,
    location: "Dubai",
    price: "8,500",
    amenities: "WiFi, breakfast",
    review: "4.5",
    distance: "12 km",
    status: "Cancelled",
  },
  {
    name: "Hotel Bristol",
    rating: 5,
    location: "Dubai",
    price: "8,500",
    amenities: "WiFi, breakfast",
    review: "4.5",
    distance: "12 km",
    status: "Confirmed",
  },
  {
    name: "Delta Hotel Saint John",
    rating: 3,
    location: "Dubai",
    price: "8,500",
    amenities: "WiFi, breakfast",
    review: "4.5",
    distance: "12 km",
    status: "Cancelled",
  },
  {
    name: "Fairmont Banff Springs",
    rating: 3,
    location: "Dubai",
    price: "8,500",
    amenities: "WiFi, breakfast",
    review: "4.5",
    distance: "12 km",
    status: "Confirmed",
  },
  {
    name: "Viswaratna Hotel",
    rating: 5,
    location: "Dubai",
    price: "8,500",
    amenities: "WiFi, breakfast",
    review: "4.5",
    distance: "12 km",
    status: "Pending",
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
                <th className="px-2 py-3 text-md font-semibold text-[#15144e]">
                  <input
                    type="checkbox"
                    checked={isAllChecked}
                    onChange={handleAllChecked}
                  />
                </th>
                {hotelBookTableHeader.map((col) => (
                  <th
                    key={col.field}
                    className={`px-2 py-3 text-md font-semibold text-[#15144e] ${
                      col.headerName === "Hotel Name" ? "text-left" : ""
                    } `}
                  >
                    {col.headerName}
                  </th>
                ))}
                <th className="px-2 py-3 text-md font-semibold text-[#15144e]"></th>
              </tr>
            </thead>

            <tbody className=" border-b border-gray-200 text-center text-xs">
              {currentRows.map((row, i) => {
                const actualIndex = indexOfFirstRow + i;
                return (
                  <tr key={row.name} className="p-6">
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={childCheckboxes[actualIndex]}
                        onChange={() => handleChildChecked(actualIndex)}
                      />
                    </td>
                    <td className="p-2 text-left">{row.name}</td>
                    <td className="p-2">
                      <div className="flex justify-center align-center">
                        {row.rating}
                        <FaStar className="text-[gold] ml-1" />
                      </div>
                    </td>
                    <td className="p-2">{row.location}</td>
                    <td className="p-2">
                      <div className="flex gap-2 justify-center items-center">
                        {"\u20B9"}
                        {row.price}
                      </div>
                    </td>
                    <td className="p-2">{row.amenities}</td>
                    <td className="p-2">{row.review}</td>
                    <td className="p-2">{row.distance}</td>
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
