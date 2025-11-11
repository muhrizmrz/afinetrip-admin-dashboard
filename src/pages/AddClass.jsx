import AddClassForm from "../components/admin/AddClassForm";
import AdminLayout from "../components/admin/AdminLayout/AdminLayout";

export default function AddAgent() {
  return (
    <div>
      <AdminLayout children={<AddClassForm />} />
    </div>
  );
}


