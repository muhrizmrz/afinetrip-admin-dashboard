export default function ImageUpload({fileName, title, onChange, titleClassName = ""}) {
  const inputId = title.toLowerCase().replace(/\s+/g, "-") + "-upload";

  return (
    <div className="w-full flex flex-col mb-4">
      <label className={`mb-2 text-[#15144e] ${titleClassName}`}>{title}</label>

      <div className="flex items-center border border-[#d0d0d0] rounded w-full overflow-hidden">
        <div className="flex-grow px-3 py-2 text-sm text-gray-700 truncate  cursor-pointer">
          {fileName || "No image selected"}
        </div>

        <label
          htmlFor="image-upload"
          className="border border-[#15144E] text-[#15144E] px-2 mr-1 py-1 rounded text-sm cursor-pointer hover:bg-[#15144E] hover:text-white transition duration-300 whitespace-nowrap"
        >
          Choose File
        </label>

        <input
          id={inputId}
          type="file"
          accept="image/*"
          onChange={onChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
