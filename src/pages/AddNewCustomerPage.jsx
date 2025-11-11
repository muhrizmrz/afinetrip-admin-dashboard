import AddNewCustomerForm from "../components/admin/AddNewCustomerForm";
import AdminLayout from "../components/admin/AdminLayout/AdminLayout";

export default function AddNewCustomerFormPage() {
  return (
    <div>
          <AdminLayout children={<AddNewCustomerForm />} />
        </div>
  );
}
