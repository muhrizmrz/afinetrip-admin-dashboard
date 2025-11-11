import SupplierList from "../components/admin/SupplierList";
import AdminLayout from "../components/admin/AdminLayout/AdminLayout";

export default function SupplierListPage() {
  return (
    <div>
      <AdminLayout children={<SupplierList />} />
    </div>
  );
}
