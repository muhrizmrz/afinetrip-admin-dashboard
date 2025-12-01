import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { getAgent } from '../../services/agentService';
import AgentTransactions from './AgentTransactions';

// // API function - adjust the endpoint as per your backend
// const fetchAgentDetails = async (agentId) => {
//   const response = await fetch(`/api/agents/${agentId}`); // Calls your Laravel backend via API Gateway
//   if (!response.ok) throw new Error('Failed to fetch agent details');
//   return response.json();
// };

const AgentDetails = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();

  const {
    data: agent,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['agent', agentId],
    queryFn: () => getAgent(agentId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Tabs state
  const [activeTab, setActiveTab] = React.useState('overview');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-600">Loading agent details...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-red-600 text-lg">
          Error: {error?.message || 'Something went wrong'}
        </div>
      </div>
    );
  }

return (
    <div className="min-h-screenpy-8 px-4">
        <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center cursor-pointer text-blue-600 hover:text-blue-800 font-medium"
            >
                ← Back to Agents
            </button>

            {/* Agent Header Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-600">
                            {agent.contact_name?.charAt(0).toUpperCase() || '-'}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{agent.contact_name}</h1>
                            <p className="text-gray-600">{agent.email}</p>
                            {/* <p className="text-sm text-gray-500">Agent ID: {agent.agent_code || agent.id}</p> */}
                            <p className="text-sm text-gray-500">
                                {[
                                    agent.city?.name,
                                    agent.state?.name,
                                    agent.country?.name,
                                ]
                                    .filter(Boolean)
                                    .join(', ') || '-'}
                            </p>
                        </div>
                    </div>

                    {/* Balance Card */}
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Wallet Balance</p>
                        <p className="text-4xl font-bold text-green-600">
                            ₹{(agent.wallet_account?.balance ?? 0).toLocaleString()}
                        </p>
                        <span className={`text-sm ${agent.is_active ? 'text-green-600' : 'text-red-600'}`}>
                            ● {agent.is_active ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6" aria-label="Tabs">
                        {['overview', 'bookings', 'transactions', 'profile'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pt-4 pb-2 px-1 border-b-2 cursor-pointer font-medium text-sm capitalize transition-colors ${
                                    activeTab === tab
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab === 'overview' && 'Overview'}
                                {tab === 'bookings' && 'Bookings'}
                                {tab === 'transactions' && 'Transactions'}
                                {tab === 'profile' && 'Profile Details'}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-50 p-5 rounded-lg">
                                <p className="text-sm text-gray-600">Total Bookings</p>
                                <p className="text-2xl font-bold text-gray-900">{agent.total_bookings || 0}</p>
                            </div>
                            <div className="bg-gray-50 p-5 rounded-lg">
                                <p className="text-sm text-gray-600">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ₹{(agent.total_revenue || 0).toLocaleString()}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-5 rounded-lg">
                                <p className="text-sm text-gray-600">Joined Date</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {agent.created_at ? format(new Date(agent.created_at), 'dd MMM yyyy') : '-'}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Bookings Tab */}
                    {activeTab === 'bookings' && (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
                            {agent.bookings && agent.bookings.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    PNR
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Passenger
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Route
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Amount
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {agent.bookings.map((booking) => (
                                                <tr key={booking.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {booking.pnr}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {booking.passenger_name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {booking.from} → {booking.to}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        ₹{booking.amount}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                booking.status === 'confirmed'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : booking.status === 'cancelled'
                                                                    ? 'bg-red-100 text-red-800'
                                                                    : 'bg-yellow-100 text-yellow-800'
                                                            }`}
                                                        >
                                                            {booking.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-500">No bookings found.</p>
                            )}
                        </div>
                    )}

                    {/* Transactions Tab */}
                    {activeTab === 'transactions' && (
                        // <div>
                        //     <h3 className="text-lg font-semibold mb-4">Wallet Transactions</h3>
                        //     {agent.transactions && agent.transactions.length > 0 ? (
                        //         <div className="space-y-3">
                        //             {agent.transactions.map((tx) => (
                        //                 <div
                        //                     key={tx.id}
                        //                     className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                        //                 >
                        //                     <div>
                        //                         <p className="font-medium text-gray-900">{tx.description}</p>
                        //                         <p className="text-sm text-gray-500">
                        //                             {tx.created_at ? format(new Date(tx.created_at), 'dd MMM yyyy, hh:mm a') : '-'}
                        //                         </p>
                        //                     </div>
                        //                     <div
                        //                         className={`text-lg font-bold ${
                        //                             tx.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        //                         }`}
                        //                     >
                        //                         {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                        //                     </div>
                        //                 </div>
                        //             ))}
                        //         </div>
                        //     ) : (
                        //         <p className="text-gray-500">No transactions found.</p>
                        //     )}
                        // </div>
                        <AgentTransactions wallet_id={agent?.wallet_account?.id} />
                    )}

                    {/* Profile Details Tab */}
                    {activeTab === 'profile' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-600">Full Name</p>
                                <p className="text-lg font-medium">{agent.contact_name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Email</p>
                                <p className="text-lg font-medium">{agent.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Phone</p>
                                <p className="text-lg font-medium">{agent.mobile || '-'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Agency Name</p>
                                <p className="text-lg font-medium">{agent.company_name || '-'}</p>
                            </div>
                            {/* <div>
                                <p className="text-sm text-gray-600">Address</p>
                                <p className="text-lg font-medium">{agent.address || '-'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">GST Number</p>
                                <p className="text-lg font-medium">{agent.gst_number || '-'}</p>
                            </div> */}

                            {/* New location fields */}
                            <div>
                                <p className="text-sm text-gray-600">Country</p>
                                <p className="text-lg font-medium">{agent.country?.name || '-'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">State</p>
                                <p className="text-lg font-medium">{agent.state?.name || '-'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">City</p>
                                <p className="text-lg font-medium">{agent.city?.name || '-'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Location</p>
                                <p className="text-lg font-medium">
                                    {[
                                        agent.city?.name,
                                        agent.state?.name,
                                        agent.country?.name,
                                    ]
                                        .filter(Boolean)
                                        .join(', ') || '-'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);
};

export default AgentDetails;