import AgentClassList from "../components/admin/AgentClassList";
import AdminLayout from "../components/admin/AdminLayout/AdminLayout";

export default function AgClassList() {
  return (
    <div>
      <AdminLayout children={<AgentClassList />} />
    </div>
  );
}


