import React from 'react';

const AgentDetails = ({ agent }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Agency Name</label>
          <p className="mt-1 text-lg font-semibold text-gray-900">{agent.company_name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <p className="mt-1 text-gray-900">{agent.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <p className="mt-1 text-gray-900">{agent.mobile}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <p className="mt-1">
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
              agent.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {agent.is_active ? 'Active' : 'Inactive'}
            </span>
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Wallet Balance</label>
          <p className="mt-1 text-2xl font-bold text-indigo-600">₹{agent.wallet_accounts?.[0]?.balance.toLocaleString()}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Joined On</label>
          <p className="mt-1 text-gray-900">{new Date(agent.created_at).toLocaleDateString('en-IN')}</p>
        </div>
      </div>

      {/* You can add more tabs or sections here later */}
      <div className="border-t pt-5">
        <h4 className="text-lg font-medium text-gray-800 mb-3">Recent Activity</h4>
        <p className="text-gray-500 italic">Activity log will appear here...</p>
      </div>
    </div>
  );
};

export default AgentDetails;