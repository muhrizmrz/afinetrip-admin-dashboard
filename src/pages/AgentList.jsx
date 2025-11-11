import AgentListTable from "../components/admin/AgentListTable";
import AdminLayout from "../components/admin/AdminLayout/AdminLayout";

export default function AgentList() {
  return (
    <div>
      <AdminLayout children={<AgentListTable />} />
    </div>
  );
}


