import SearchSummary from "../components/search/SearchSummary";
import AdminLayout from "../components/admin/AdminLayout/AdminLayout";
export default function FlightResultPage() {
  return (
    <div>
      <AdminLayout children={<SearchSummary />} />
    </div>
  );
}
