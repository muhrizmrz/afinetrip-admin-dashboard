import AgentDepositRequestList from "../components/admin/AgentDepositRequestList";
import AdminLayout from "../components/admin/AdminLayout/AdminLayout";

export default function AgentDepReqList() {
  return (
    <div>
      <AdminLayout children={<AgentDepositRequestList />} />
    </div>
  );
}
