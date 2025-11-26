import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { Wallet, Plus, Loader2, IndianRupee, Euro } from 'lucide-react';
import { getMainBalance, topUp } from '../services/walletService';
import Breadcrumbs from '../components/utility/Breadcrumbs';

export default function MainWallet() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [topUpLoading, setTopUpLoading] = useState(false);

  const token = localStorage.getItem('token');

  // Fetch main wallet balance
  const fetchBalance = async () => {
    try {
      setLoading(true);
      const data = await getMainBalance();
      console.log('Wallet Balance Data:', data);
      setBalance(data.balance || 0);
    } catch (err) {
      toast.error('Failed to load wallet balance');
    } finally {
      setLoading(false);
    }
  };

  // Handle top-up
  const handleTopUp = async () => {
    const numAmount = parseFloat(amount);
    if (!amount || numAmount < 100) {
      toast.error('Minimum top-up amount is ₹100');
      return;
    }

    try {
      setTopUpLoading(true);
      await topUp({ amount: numAmount});

      toast.success(`₹${numAmount.toLocaleString('en-IN')} added successfully!`);
      setAmount('');
      setIsTopUpOpen(false);
      fetchBalance();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Top-up failed');
    } finally {
      setTopUpLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <Breadcrumbs />
      <div className="min-h-screen bg-transparent p-4 md:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Top Up</h1>
            {/* <p className="text-gray-600 mt-1">Manage platform-wide credits for all agents & bookings</p> */}
          </div>

          {/* Balance Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
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
                  className="bg-white text-blue-700 cursor-pointer hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition"
                >
                  <Plus className="w-5 h-5" />
                  Top Up
                </button>
              </div>
            </div>

            <div className="p-8">
              {loading ? (
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

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <p className="text-gray-600 text-sm">Total Top-ups</p>
                  <p className="text-3xl font-bold text-green-600 mt-1 inline-flex items-center"> 
                    <Euro className="w-8 h-8 text-green-600" />
                    1,85,000
                    </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <p className="text-gray-600 text-sm">Total Spent</p>
                  <p className="text-3xl font-bold text-blue-600 mt-1 inline-flex items-center">
                    <Euro className="w-8 h-8 text-blue-600" />
                    1,42,300
                    </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <p className="text-gray-600 text-sm">Low Balance Alert</p>
                  <p className="text-3xl font-bold text-orange-600 mt-1">Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions Placeholder */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
            <div className="text-center py-12 text-gray-500">
              Transaction history will appear here once top-ups are made
            </div>
          </div>
        </div>
      </div>

      {/* Top-Up Modal */}
      {isTopUpOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Top Up Main Wallet</h2>
            <p className="text-gray-600 mb-6">Add credits to your platform's main wallet</p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
                <p className="text-sm text-gray-500 mt-2">Minimum top-up: ₹100</p>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => {
                  setIsTopUpOpen(false);
                  setAmount('');
                }}
                className="flex-1 py-3 border cursor-pointer border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleTopUp}
                disabled={topUpLoading || !amount || parseFloat(amount) < 100}
                className="flex-1 bg-blue-600 cursor-pointer text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
              >
                {topUpLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Top Up Wallet'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}