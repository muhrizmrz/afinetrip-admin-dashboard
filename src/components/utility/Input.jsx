export default function Input({ label = "", placeholder = "", type = "text" }) {
  return (
    <div className="w-full flex flex-col">
      <label className="mb-2 text-[#15144e]">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        className="rounded border border-[#d0d0d0] py-1 px-2 w-full outline-none"
      />
    </div>
  );
}
