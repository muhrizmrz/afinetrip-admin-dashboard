import Header from "../components/admin/AdminLayout/Header";
import Footer from "../components/Layout/Footer";
import Sidebar from "../components/admin/Sidebar";
import footerImage from "/images/footer_image.svg";
import AddNewCustomerForm from "../components/admin/AddNewCustomerForm";

export default function AddNewCustomerFormPage() {
  return (
    <div className="flex flex-col min-h-screen gradient-bg overflow-x-hidden">
      <Header />

      <div className="flex flex-col md:flex-row pt-40 px-4 md:px-8 gap-6 w-full max-w-[100vw] overflow-hidden">
        <Sidebar />

        <div className="flex-1 w-full overflow-x-hidden">
          <AddNewCustomerForm />
        </div>
      </div>

      <div className="w-full mt-10 px-4 md:px-8">
        <img src={footerImage} alt="Footer" className="w-full " />
      </div>

      <Footer />
    </div>
  );
}
