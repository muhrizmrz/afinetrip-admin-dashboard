import CustomPagination from "../utility/CustomPagination";
import { PiSlidersHorizontalFill } from "react-icons/pi";
import { CiExport } from "react-icons/ci";
import ExampleTrackChild from "./ExampleTrackChild";
import { IoIosArrowDown } from "react-icons/io";
import Breadcrumbs from "../utility/Breadcrumbs";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { agentListTableHeader } from "../utility/MenuItems";
import Button from "../utility/Button";
import { getAgents } from "../../services/agentService";
import { deductCreditFromAgent, updateAgentCredit } from "../../services/walletService";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Euro } from "lucide-react";
import { Link } from "react-router-dom";

export default function DataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  // const [rows, setRows] = useState([]);

  const [isManageCreditOpen, setIsManageCreditOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [updateCreditLoading, setUpdateCreditLoading] = useState(false);
  const [agentId, setAgentId] = useState(null);
  const [creditAction, setCreditAction] = useState('add'); // 'add' or 'deduct'


  const [openDropdownId, setOpenDropdownId] = useState(null); // added for dropdown open state
  const dropdownRefs = useRef({});

  // useEffect(() => {
  //   const fetchAgents = async () => {
  //     const data = await getAgents();
  //     console.log(data);
  //     setRows(data.agents || []);
  //   }
  //   fetchAgents();
  // }, []);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const res = await getAgents();
      console.log('Fetched Agents:', res.agents);
      return res.agents || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes caching
  });

  const rows = data || [];

  // --- Dynamic Stats ---
  const activeCount = rows.filter(a => a.is_active).length;
  const inactiveCount = rows.filter(a => !a.is_active).length;

  // Sum all balances safely
  const totalBalance = rows.reduce((sum, a) => {
    const bal = Number(a?.wallet_accounts?.[0]?.balance || 0);
    return sum + bal;
  }, 0);

  // console.log('Rows in AgentListTable:', rows);

  // Helper toggle (unchanged)
  const handleToggleDropdown = (e, id) => {
    e.stopPropagation();
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  // const handleCreditUpdate = async () => {
  //   const numAmount = parseFloat(amount);
  //   if (!amount || numAmount < 100) {
  //     toast.error('Minimum amount is ₹100');
  //     return;
  //   }

  //   try {
  //     SetUpdateCreditLoading(true);
  //     if (creditAction === 'deduct') {
  //       await deductCreditFromAgent({ amount: numAmount, agent_id: agentId });
  //     } else {
  //     await updateAgentCredit({ amount: numAmount, agent_id: agentId });
  //     }

  //     toast.success(`₹${numAmount.toLocaleString('en-IN')} added successfully!`);
  //     setAmount('');
  //     // SetUpdateCreditLoading(false);
  //     // fetchBalance();
  //   } catch (err) {
  //     toast.error(err.response?.data?.message || 'Top-up failed');
  //   } finally {
  //     setIsManageCreditOpen(false);
  //     SetUpdateCreditLoading(false);
  //   }
  // };

  // --- New PortalDropdown component inside this file ---
  // const handleCreditUpdate = () => {
  //   const numAmount = parseFloat(amount);

  //   if (!amount || numAmount < 100) {
  //     toast.error("Minimum amount is ₹100");
  //     return;
  //   }

  //   updateCreditMutation.mutate({
  //     amount: numAmount,
  //     agent_id: agentId,
  //     action: creditAction,
  //   });

  //   setIsManageCreditOpen(false);
  //   setAmount("");
  //   setCreditAction("add");
  // };

  function PortalDropdown({ anchorEl, isOpen, onClose, children, alignRight = true }) {
    const dropdownRef = useRef(null);
    const [style, setStyle] = useState({ top: 0, left: 0 });

    const updatePosition = () => {
      if (!anchorEl || !dropdownRef.current) return;
      const rect = anchorEl.getBoundingClientRect();
      const ddRect = dropdownRef.current.getBoundingClientRect();
      const left = alignRight
        ? rect.right - ddRect.width + window.scrollX
        : rect.left + window.scrollX;
      const top = rect.bottom + window.scrollY;
      setStyle({ left, top });
    };

    useLayoutEffect(() => {
      if (!isOpen) return;
      updatePosition();
      const handle = () => updatePosition();
      window.addEventListener("resize", handle);
      window.addEventListener("scroll", handle, true);
      return () => {
        window.removeEventListener("resize", handle);
        window.removeEventListener("scroll", handle, true);
      };
    }, [isOpen, anchorEl]);

    useEffect(() => {
      if (!isOpen) return;
      function handleClick(e) {
        const clickedInsideAnchor = anchorEl && anchorEl.contains(e.target);
        const clickedInsideDropdown = dropdownRef.current && dropdownRef.current.contains(e.target);
        if (!clickedInsideAnchor && !clickedInsideDropdown) {
          onClose?.();
        }
      }
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }, [isOpen, anchorEl, onClose]);

    if (!isOpen) return null;
    return createPortal(
      <div
        ref={dropdownRef}
        style={{
          position: "absolute",
          top: style.top,
          left: style.left,
          zIndex: 9999,
          minWidth: 160,
        }}
        className="bg-white rounded-md border border-gray-50 shadow-xl"
      >
        {children}
      </div>,
      document.body
    );
  }

  const handleManageCredit = (id) => {
    setAgentId(id);
    setAmount('');
    setCreditAction('add'); // default to Add tab
    setIsManageCreditOpen(true);
  };

  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(rows.length / rowsPerPage);


  const updateCreditMutation = useMutation({
    mutationFn: async ({ amount, agent_id, action }) => {
      if (action === "deduct") {
        return await deductCreditFromAgent({ amount, agent_id });
      }
      return await updateAgentCredit({ amount, agent_id });
    },

    onMutate: () => {
      setUpdateCreditLoading(true);
    },

    onSuccess: (_, { amount, agent_id, action }) => {
      queryClient.setQueryData(["agents"], (oldAgents) => {
        if (!oldAgents) return oldAgents;

        return oldAgents.map((agent) => {
          if (agent.id !== agent_id) return agent;

          const currentBalance = Number(agent.wallet_accounts[0].balance);

          const updatedBalance =
            action === "add"
              ? currentBalance + Number(amount)
              : currentBalance - Number(amount);
            
          setUpdateCreditLoading(false);
          

          return {
            ...agent,
            wallet_accounts: [
              {
                ...agent.wallet_accounts[0],
                balance: updatedBalance,
              },
            ],
          };
        });
      });

        toast.success(
          `₹${amount.toLocaleString("en-IN")} ${action === "add" ? "added" : "deducted"
          } successfully!`
        );
    },


    onError: (err) => {
      toast.error(err.response?.data?.message || "Update failed");
    },
  });

  const handleCreditUpdate = () => {
    const numAmount = parseFloat(amount);

    if (!amount || numAmount < 100) {
      toast.error("Minimum amount is ₹100");
      return;
    }

    updateCreditMutation.mutate({
      amount: numAmount,
      agent_id: agentId,
      action: creditAction,
    });

    setIsManageCreditOpen(false);
    setAmount("");
    setCreditAction("add");
  };


  return (
    <div>
      <Breadcrumbs />
      <h1 className="text-xl font-semibold text-[#15144E] mb-6">Agent List</h1>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full md:w-1/2">
          <div className="flex items-center justify-between bg-white px-4 py-3 text-[#15144E] rounded-lg shadow-sm">
            <span className="text-md font-normal">Active</span>
            <span className="text-[#15144e] text-lg font-bold">{activeCount}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3 bg-white text-[#15144E] rounded-lg shadow-sm">
            <span className="text-md font-normal">In Active</span>
            <span className="text-[#15144e] text-lg font-bold">{inactiveCount}</span>
          </div>
          <div className="flex items-center justify-between bg-white px-4 py-3 text-[#15144E] rounded-lg shadow-sm">
            <span className="text-md font-normal">Balance</span>
            <span className="text-[#15144e] text-lg font-bold">
              {new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(totalBalance)}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          <Button className="flex items-center justify-center gap-2" variant="primary">
            <PiSlidersHorizontalFill size={18} />
            <span className="text-sm font-medium">Filter</span>
          </Button>

          <Button className="flex items-center justify-center gap-2 " variant="outline">
            <span className="text-sm font-medium">Clear Filter</span>
          </Button>
          <div>
            <button className="flex items-center justify-center py-2 text-[#15144E] rounded-lg">
              <a href="" className="flex items-center gap-1">
                <CiExport size={18} />
                <span className="text-md capitalize">export</span>
              </a>
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table-auto min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 border-b border-gray-200 ">
              <tr>
                {agentListTableHeader.map((col) => (
                  <th
                    key={col.field}
                    className={`px-3  py-3 text-md font-semibold text-[#15144e]
                      ${col.headerName === "Agency" ||
                        col.headerName === "Agent"
                        ? "text-left"
                        : ""
                      }`}
                  >
                    {col.headerName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b-3 border-gray-200 text-sm text-[#15144e] text-center"
                >
                  <td className="p-3  ">{row.id}</td>
                  <td className="p-3   font-semibold text-left">
                    {row.company_name}
                  </td>
                  <td className="p-3   font-semibold text-left">{row.contact_name}</td>
                  <td className="p-3 text-gray-500">
                    <div className="flex gap-2 justify-center items-center">
                      {/* {"\u20AC"} */}
                      {new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Number(row?.wallet_accounts?.[0]?.balance || 0))}
                    </div>
                  </td>
                  <td className="p-3 text-gray-500">
                    <div className="flex gap-2 justify-center items-center">
                      {"\u20AC"}
                      {row.wallet_accounts?.[0]?.credit_limit}
                    </div>
                  </td>
                  <td className="px-3  py-3 text-sm text-right  text-[#15144e]">
                    <ExampleTrackChild is_active={row.is_active} />
                  </td>
                  <td className="px-3  py-3 text-sm text-right text-[#15144e]">
                    <div className="flex gap-[10px] align-center w-full justify-center">
                      <div
                        className="relative"
                        ref={(el) => (dropdownRefs.current[row.id] = el)}
                      >
                        <Button
                          className="flex items-center gap-1"
                          variant="primary"
                          onClick={(e) => handleToggleDropdown(e, row.id)}
                        >
                          Action
                          <IoIosArrowDown className="text-[#fff]" />
                        </Button>

                        <PortalDropdown
                          anchorEl={dropdownRefs.current[row.id]}
                          isOpen={openDropdownId === row.id}
                          onClose={() => setOpenDropdownId(null)}
                          alignRight={true}
                        >
                          <button
                            onClick={() => {
                              handleViewDetails(agent);
                              setOpenDropdownId(null);
                            }}
                            className="w-full flex cursor-pointer items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all"
                          >
                            {/* <eye className="w-4 h-4" /> */}
                            <span>View Details</span>
                          </button>

                          {/* Edit Agent */}
                          <Link
                            // onClick={() => {
                            //   handleEdit(agent);
                            //   setOpenDropdownId(null);
                            // }}
                            to={`/edit-agent/${row.id}`}
                            className="w-full flex cursor-pointer items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all"
                          >
                            {/* <edit className="w-4 h-4" /> */}
                            <span>Edit Agent</span>
                          </Link>

                          {/* Credit Management */}
                          <button
                            onClick={() => {
                              handleManageCredit(row.id);
                              setAgentId(row.id);
                              setOpenDropdownId(null);
                            }}
                            className="w-full flex cursor-pointer items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all border-t border-gray-100"
                          >
                            {/* <indianrupee className="w-4 h-4" /> */}
                            <span>Manage Credit Limit</span>
                          </button>
                        </PortalDropdown>
                      </div>

                      <Button className="flex items-center gap-1 rounded-md text-xs" variant="outline">
                        Finance
                        <IoIosArrowDown className="text-[#15144E] " />
                      </Button>{" "}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isManageCreditOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
                {/* Close Button */}
                <button
                  onClick={() => {
                    setIsManageCreditOpen(false);
                    setAmount('');
                    setCreditAction('add'); // reset tab
                    setAgentId(null);
                  }}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light transition"
                >
                  ×
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Manage Agent Credit Limit
                </h2>

                {/* Agent Info */}
                {agentId && rows.find(r => r.id === agentId) && (
                  <div className="mb-6 p-5 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100">
                    <p className="text-sm font-medium text-indigo-700">Selected Agent</p>
                    <p className="text-lg font-semibold text-indigo-900">
                      {rows.find(r => r.id === agentId).contact_name}
                    </p>
                    <p className="text-xs text-indigo-600">
                      {rows.find(r => r.id === agentId).company_name}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-gray-600">Current Credit Limit</span>
                      <span className="text-xl font-bold text-indigo-900">
                        {new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(
                          Number(rows.find(r => r.id === agentId).wallet_accounts[0].credit_limit || 0)
                        )}
                      </span>
                    </div>
                  </div>
                )}

                {/* Tabs: Add Credit / Deduct Credit */}
                <div className="flex mb-6 border-b border-gray-200">
                  <button
                    onClick={() => setCreditAction('add')}
                    className={`flex-1 py-3 text-sm font-semibold transition-all border-b-2 ${creditAction === 'add'
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    Add Credit
                  </button>
                  <button
                    onClick={() => setCreditAction('deduct')}
                    className={`flex-1 py-3 text-sm font-semibold transition-all border-b-2 ${creditAction === 'deduct'
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    Deduct Credit
                  </button>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {creditAction === 'add' ? 'Amount to Add (€)' : 'Amount to Deduct (€)'}
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-600">
                        {creditAction === 'add' ? '+' : '−'}
                      </span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount (min €100)"
                        min="100"
                        className={`w-full pl-14 pr-4 py-4 border rounded-xl text-lg font-medium
                focus:outline-none focus:ring-4 transition-all
                ${creditAction === 'add'
                            ? 'border-gray-300 focus:ring-indigo-500/20 focus:border-indigo-500'
                            : 'border-gray-300 focus:ring-red-500/20 focus:border-red-500'
                          }`}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Minimum amount: <span className="font-semibold">€100</span>
                    </p>
                  </div>

                  {/* Action Summary Preview */}
                  {/* {amount && parseFloat(amount) >= 100 && (
                    <div className={`p-4 rounded-lg text-sm font-medium ${creditAction === 'add'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                      <strong>
                        {creditAction === 'add' ? 'add' : 'deduct'} ₹{Number(amount).toLocaleString('en-IN')}
                      </strong>{' '}
                      {creditAction === 'add' ? 'to' : 'from'} this agent’s credit limit.
                    </div>
                  )} */}
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => {
                      setIsManageCreditOpen(false);
                      setAmount('');
                      setCreditAction('add');
                      setAgentId(null);
                    }}
                    className="flex-1 py-3 border border-gray-300 cursor-pointer rounded-xl font-semibold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleCreditUpdate}
                    disabled={
                      updateCreditMutation.isPending ||
                      !amount ||
                      parseFloat(amount) < 100
                    }
                    className={`flex-1 py-3 rounded-xl cursor-pointer font-semibold flex items-center justify-center gap-2 transition-all ${creditAction === 'add'
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {updateCreditMutation.isPending ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      creditAction === 'add' ? 'Add Credit' : 'Deduct Credit'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}


          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}