import AddAgentForm from "../components/admin/AddAgentForm";
import AdminLayout from "../components/admin/AdminLayout/AdminLayout";

export default function AddAgent() {
  return (
    <div>
      <AdminLayout children={<AddAgentForm />} />
    </div>
  );
}
