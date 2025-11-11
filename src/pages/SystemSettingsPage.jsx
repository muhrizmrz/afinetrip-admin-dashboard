  import SystemSettings from "../components/admin/SystemSettings";
import AdminLayout from "../components/admin/AdminLayout/AdminLayout";

export default function SystemSettingsPage() {
  return (
    <div>
      <AdminLayout children={<SystemSettings />} />
    </div>
  );
}
