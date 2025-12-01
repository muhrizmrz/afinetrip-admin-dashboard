// components/AgentStatusToggle.jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeAgentStatus } from "../../services/agentService";
import { useState } from "react";

export default function AgentStatusToggle({ agentId, is_active: initialIsActive }) {
  const queryClient = useQueryClient();

  // Keep local UI in sync with server state first
  const [isActive, setIsActive] = useState(initialIsActive);

  const mutation = useMutation({
    mutationFn: (newStatus) => changeAgentStatus(agentId, { is_active: newStatus }),

    // Optimistic Update — Best UX
    onMutate: async (newStatus) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["agents"] });
      await queryClient.cancelQueries({ queryKey: ["agent", agentId] });

      // Snapshot previous data
      const previousAgents = queryClient.getQueryData(["agents"]);
      const previousAgent = queryClient.getQueryData(["agent", agentId]);

      // Optimistically update cache
      queryClient.setQueryData(["agents"], (old) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((agent) =>
            agent.id === agentId ? { ...agent, is_active: newStatus } : agent
          ),
        };
      });

      queryClient.setQueryData(["agent", agentId], (old) => {
        if (!old) return old;
        return { ...old, is_active: newStatus };
      });

      // Update local UI immediately
      setIsActive(newStatus);

      // Return context for rollback
      return { previousAgents, previousAgent };
    },

    // On Success → already updated optimistically
    onSuccess: () => {
      // Optional: refetch to ensure consistency (recommended for critical data)
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      queryClient.invalidateQueries({ queryKey: ["agent", agentId] });
    },

    // On Error → Rollback
    onError: (err, newStatus, context) => {
      // Revert optimistic update
      queryClient.setQueryData(["agents"], context.previousAgents);
      queryClient.setQueryData(["agent", agentId], context.previousAgent);
      setIsActive(!newStatus); // revert local toggle

      console.error("Failed to update agent status:", err);
      // toast.error("Failed to update status");
    },

    // Always runs after success/error
    onSettled: () => {
      // Optional extra safety
      // queryClient.invalidateQueries({ queryKey: ["agents"] });
    },
  });

  const handleToggle = () => {
    const newStatus = !isActive;
    mutation.mutate(newStatus);
  };

  return (
    <div className="flex justify-center items-center w-full mx-auto">

      <button
        onClick={handleToggle}
        disabled={mutation.isPending}
        className={`relative flex items-center justify-around h-8 w-32 rounded-full transition-all duration-300 ${
          isActive ? "bg-[#15144E] text-white" : "bg-[#EEEEEE]"
        } `}
      >
        <span
          className={`text-sm transition-colors duration-300 cursor-pointer
          }`}
        >
          Inactive
        </span>
        <span
          className={`text-sm transition-colors duration-300 cursor-pointer
          `}
        >
          Active
        </span>

        {/* Thumb */}
        <div
          className={`
            absolute w-1/2 rounded-full  flex items-center justify-center text-sm transition-all  duration-300  
            ${
              isActive
                ? "left-0 top-1 bottom-1  ml-1 bg-[#EEEEEE] text-[#15144E] transition "
                : "left-1/2   bg-[#15144E] text-[#EEEEEE] h-full transition"
            }
          `}
        >
          {isActive ? "Inactive" : "Active"}
        </div>
      </button>
    </div>
  );
}