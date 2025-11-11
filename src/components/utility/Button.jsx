export default function Button({
  variant = "primary",
  onClick,
  children,
  disabled = false,
  type="",
  className = "",
}) {
  const styles = {
    primary: `bg-[#15144E] text-white px-4 py-2 shadow-md cursor-pointer rounded hover:bg-[#2a2965] ${className}`,
    secondary: `bg-gray-200 text-black px-4 py-2 shadow-md cursor-pointer rounded hover:bg-gray-300 ${className}`,
    outline: `border border-[#15144E] text-[#15144E] px-4 py-2 cursor-pointer rounded ${className}`,
  };

  return (
    <button className={styles[variant]} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
}
