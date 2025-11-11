import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AgentList from "./pages/AgentList";
import AddAgent from "./pages/AddAgent";
import AddClass from "./pages/AddClass";
import AgClassList from "./pages/AgClassList";
import LoginPage from "./pages/LoginPage";
import AgentDepositRequestList from "./pages/AgentDepReqList";
import SupplierListPage from "./pages/SupplierListPage";
import FlightBookingListPage from "./pages/FlightBookingListPage";
import B2CFlightMarkupPage from "./pages/B2CFlightMarkupPage";
import AddBlogCategoryFormPage from "./pages/AddBlogCategoryFormPage";
import AddBlogFormPage from "./pages/AddBlogPage";
import AddNewCustomerFormPage from "./pages/AddNewCustomerPage";
import SystemSettingsPage from "./pages/SystemSettingsPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/agentlist" element={<AgentList />} />
        <Route path="/addagent" element={<AddAgent />} />
        <Route path="/addclass" element={<AddClass />} />
        <Route path="/classlist" element={<AgClassList />} />
        <Route path="/depreqlist" element={<AgentDepositRequestList />} />
        <Route path="/supplierlist" element={<SupplierListPage />} />
        <Route path="/flightbookinglist" element={<FlightBookingListPage />} />
        <Route path="/addb2cflightmarkup" element={<B2CFlightMarkupPage />} />
        <Route path="/addblogcategory" element={<AddBlogCategoryFormPage />} />
        <Route path="/addblog" element={<AddBlogFormPage />} />
        <Route path="/addnewcustomer" element={<AddNewCustomerFormPage />} />
        <Route path="/systemsettings" element={<SystemSettingsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
