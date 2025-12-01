import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { getTransactionByAgent } from '../../services/walletService';


const AgentTransactions = ({ wallet_id }) => {
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['agent-transactions', wallet_id],
    queryFn: () => getTransactionByAgent(wallet_id),
    enabled: !!wallet_id, // Only run if wallet_id exists
    select: (res) => res.data || res, // Handle both {data: [...] } and direct array
    staleTime: 1000 * 60, // 1 minute
  });

  const transactions = response || [];

  // Loading State
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Wallet Transactions</h3>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 h-20 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-4">Wallet Transactions</h3>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error?.message || 'Failed to load transactions'}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Wallet Transactions</h3>

      {transactions.length > 0 ? (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {tx.description || 'Transaction'}
                </p>
                <p className="text-sm text-gray-500">
                  {tx.created_at
                    ? format(new Date(tx.created_at), 'dd MMM yyyy, hh:mm a')
                    : '-'}
                </p>
                {tx.reference && (
                  <p className="text-xs text-gray-400 mt-1">Ref: {tx.reference}</p>
                )}
              </div>

              <div
                className={`text-lg font-bold min-w-[100px] text-right ${
                  tx.type === 'credit' || tx.amount > 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {tx.type === 'credit' || tx.amount > 0 ? '+' : '-'}
                ₹{Math.abs(tx.amount || 0).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No transactions found for this agent.</p>
        </div>
      )}
    </div>
  );
};

export default AgentTransactions;