import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

export default function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  // Handle page change
  const handleChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  // Generate page numbers (basic version with sibling)
  const getPages = () => {
    const pages = [];
    const maxButtons = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);

    // Adjust if close to end
    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="flex justify-between items-center w-full p-4 bg-white">
      {/* Previous */}
      <button
        onClick={() => handleChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-3 py-1.5 transition 
          ${
            currentPage === 1
              ? "text-[#d0d0d0] border-gray-200 cursor-not-allowed"
              : "text-[#15144E]  cursor-pointer"
          }`}
      >
        <MdKeyboardDoubleArrowLeft className="text-lg" />
        <span>Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-2">
        {getPages().map((page) => (
          <button
            key={page}
            onClick={() => handleChange(page)}
            className={`px-1 py-1.5  text-sm font-medium transition
              ${currentPage === page ? " text-[#15144E]" : " text-gray-500"}`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => handleChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 px-3 py-1.5  transition 
          ${
            currentPage === totalPages
              ? "text-[#d0d0d0] border-gray-200 cursor-not-allowed"
              : "text-[#15144E]  cursor-pointer"
          }`}
      >
        <span>Next</span>
        <MdKeyboardDoubleArrowRight className="text-lg" />
      </button>
    </div>
  );
}
