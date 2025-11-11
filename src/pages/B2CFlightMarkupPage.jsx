import B2CFlightMarkup from "../components/admin/B2CFlightMarkup";
import AdminLayout from "../components/admin/AdminLayout/AdminLayout";

export default function B2CFlightMarkupPage() {
  return (
    <div>
      <AdminLayout children={<B2CFlightMarkup />} />
    </div>
  );
}
