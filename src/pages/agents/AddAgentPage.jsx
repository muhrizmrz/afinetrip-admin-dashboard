// AddAgentPage.jsx
import AgentForm from "../../components/agent/AgentForm";
import { useNavigate } from "react-router-dom";

export default function AddAgentPage() {
  const navigate = useNavigate();
  return <AgentForm onSuccess={() => navigate("/agentlist")} />;
}