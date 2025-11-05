import Login from "../components/Login/Login";
import footerImage from "/images/footer_image.svg";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-between items-center min-h-screen w-full overflow-hidden gradient-bg px-4 pt-8">
      {/* Login Component */}
      <div className="w-full max-w-md">
        <Login />
      </div>

      <div className="w-full mt-6">
        <img src={footerImage} alt="Footer" className="w-1/2 mx-auto" />
      </div>
    </div>
  );
}
