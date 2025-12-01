import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { changeAgentStatus } from "../../services/agentService";

export default function ExampleTrackChild({agentId, is_active}) {
  const [isActive, setIsActive] = useState(is_active);

  // console.log(agentId);

  const mutation = useMutation({
      mutationFn: (payload) => changeAgentStatus(agentId, payload),
      onSuccess: () => {
        // toast.success(isEdit ? "Agent updated successfully" : "Agent created successfully");
        queryClient.invalidateQueries({ queryKey: ["agents"] });
        // if (isEdit) {
          // queryClient.invalidateQueries({ queryKey: ["agent", agentId] });
        // }
        // onSuccess?.();
      },
      onError: (error) => {
        const errs = error?.response?.data?.errors;
        // if (errs) setServerErrors(errs);
        console.log("Error changing agent status:", errs);
        // toast.error(isEdit ? "Failed to update agent" : "Failed to create agent");
      },
      onSettled: () => setLoading(false),
    });

  return (
    <div className="flex justify-center  items-center w-full  mx-auto">
      <button
        onClick={() => {
          console.log(isActive);
          mutation.mutate(!isActive);
          setIsActive(!isActive);
        }}
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
