// EditAgentPage.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAgent } from "../../services/agentService";
import AgentForm from "../../components/agent/AgentForm";

export default function EditAgentPage() {
  const { id } = useParams();
  const { data: agent, isLoading } = useQuery({
    queryKey: ["agent", id],
    queryFn: () => getAgent(id),
  });

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;

  return <AgentForm agent={agent} onSuccess={() => window.history.back()} />;
}