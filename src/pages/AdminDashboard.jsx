import Dashboard from "../components/admin/Dashboard";
import AdminLayout from "../components/admin/AdminLayout/AdminLayout";

export default function AdminDashboard() {
  return (
    <div>
      <AdminLayout children={<Dashboard />} />
    </div>
  );
}


