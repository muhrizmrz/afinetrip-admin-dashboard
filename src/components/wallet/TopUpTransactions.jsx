import { useQuery } from '@tanstack/react-query';
import { Loader2, IndianRupee } from 'lucide-react';
import { getTopUpHistory } from '../../services/walletService';
import { format } from 'date-fns';

export default function TopUpTransactions() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['topUpHistory'],
    queryFn: getTopUpHistory,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const transactions = data?.data || [];

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No transactions yet. Top-ups will appear here.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <IndianRupee className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Wallet Top-Up</p>
              <p className="text-sm text-gray-500">
                {format(new Date(tx.created_at), 'dd MMM yyyy, hh:mm a')}
              </p>
            </div>
          </div>
          <p className="text-xl font-bold text-green-600">
            +₹{tx.amount.toLocaleString('en-IN')}
          </p>
        </div>
      ))}
    </div>
  );
}