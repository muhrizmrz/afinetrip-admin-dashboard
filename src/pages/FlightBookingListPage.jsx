import FlightBoookingList from "../components/admin/FlightBookingList";
import AdminLayout from "../components/admin/AdminLayout/AdminLayout";

export default function FlightBookingListPage() {
  return (
    <div>
      <AdminLayout children={<FlightBoookingList />} />
    </div>
  );
}
