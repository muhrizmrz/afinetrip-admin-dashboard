// pages/MainWallet.jsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast, Toaster } from 'react-hot-toast';
import { Wallet, Plus, Loader2, Euro } from 'lucide-react';

import { getMainBalance, getTopUpHistory, topUp } from '../services/walletService';
import Breadcrumbs from '../components/utility/Breadcrumbs';
import TopUpModal from '../components/wallet/TopUpModal';
import TopUpTransactions from '../components/wallet/TopUpTransactions';

export default function MainWallet() {
  const queryClient = useQueryClient();
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [amount, setAmount] = useState('');

  // Fetch Balance
  const {
    data: balanceData,
    isLoading: balanceLoading,
    error: balanceError,
  } = useQuery({
    queryKey: ['mainWalletBalance'],
    queryFn: getMainBalance,
  });

  // Fetch Transactions (will be used inside RecentTransactions too)
  const { data: transactionsData, isLoading: txLoading } = useQuery({
    queryKey: ['topUpHistory'],
    queryFn: getTopUpHistory,
  });

  // Top-Up Mutation
  const topUpMutation = useMutation({
    mutationFn: topUp,
    onSuccess: () => {
      toast.success(`₹${parseFloat(amount).toLocaleString('en-IN')} added successfully!`);
      
      // Invalidate and refetch both queries
      queryClient.invalidateQueries({ queryKey: ['mainWalletBalance'] });
      queryClient.invalidateQueries({ queryKey: ['topUpHistory'] });

      setAmount('');
      setIsTopUpOpen(false);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Top-up failed');
    },
  });

  const handleTopUp = () => {
    const numAmount = parseFloat(amount);
    if (numAmount < 100) {
      toast.error('Minimum top-up amount is ₹100');
      return;
    }
    topUpMutation.mutate({ amount: numAmount });
  };

  const balance = balanceData?.balance || 0;

  return (
    <>
      <Toaster position="top-right" />
      <Breadcrumbs />

      <div className="min-h-screen bg-transparent p-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Main Wallet</h1>
            <p className="text-gray-600 mt-1">Manage platform credits for bookings</p>
          </div>

          {/* Balance Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    <Wallet className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm">Main Wallet Balance</p>
                    <p className="text-2xl font-bold">Available Credits</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsTopUpOpen(true)}
                  className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition"
                >
                  <Plus className="w-5 h-5" />
                  Top Up
                </button>
              </div>
            </div>

            <div className="p-8">
              {balanceLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                </div>
              ) : (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Euro className="w-16 h-16 text-green-600" />
                    <span className="text-7xl font-extrabold text-gray-900">
                      {balance.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-xl text-gray-600">Total Available Credits</p>
                </div>
              )}

              {/* Stats - You can make these dynamic later */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <p className="text-gray-600 text-sm">Total Top-ups</p>
                  <p className="text-3xl font-bold text-green-600 mt-1 flex items-center justify-center gap-2">
                    <Euro className="w-8 h-8" />1,85,000
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <p className="text-gray-600 text-sm">Total Spent</p>
                  <p className="text-3xl font-bold text-blue-600 mt-1 flex items-center justify-center gap-2">
                    <Euro className="w-8 h-8" />1,42,300
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <p className="text-gray-600 text-sm">Low Balance Alert</p>
                  <p className="text-3xl font-bold text-orange-600 mt-1">Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Transactions</h2>
            <TopUpTransactions />
          </div>
        </div>
      </div>

      <TopUpModal
        isOpen={isTopUpOpen}
        onClose={() => setIsTopUpOpen(false)}
        amount={amount}
        setAmount={setAmount}
        onTopUp={handleTopUp}
        loading={topUpMutation.isPending}
      />
    </>
  );
}