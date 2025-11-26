import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa";
import Button from "../utility/Button";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/authContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault(); 
    try {
      const data = await login(email, password);
      console.log("✅ Login successful:", data);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Login failed.");
      console.error("❌ Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="flex flex-col items-center">
        <img
          src="/react/images/logo.svg"
          alt="A fine trip logo"
          className="mb-6"
        />

        <div className="bg-white rounded-lg shadow-lg w-full">
          <h2 className="text-2xl text-[#15144E] text-center mt-6">
            Login to your Account
          </h2>

          {/* ✅ Add onSubmit handler here */}
          <form onSubmit={handleLogin} className="flex flex-col p-6 space-y-4">
            {/* Email Field */}
            <div className="flex items-center border border-gray-200 rounded p-2">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            {/* Password Field */}
            <div className="flex items-center border border-gray-200 rounded p-2">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none"
              />
              <button
                type="button" // ✅ important: avoid submit behavior
                onMouseEnter={() => setIsPasswordVisible(true)}
                onMouseLeave={() => setIsPasswordVisible(false)}
                className="ml-2 text-gray-500 hover:text-gray-700"
                disabled={loading}
              >
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <Link
              to="#"
              className="text-xs text-[#15144E] hover:text-[#2a2965] text-right"
            >
              Forgot password?
            </Link>

            <Button type="submit" variant="primary" disabled={loading} className={loading ? "opacity-50 cursor-not-allowed" : ""}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
