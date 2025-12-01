// components/wallet/TopUpModal.jsx
import React from 'react';
import { Loader2 } from 'lucide-react';

export default function TopUpModal({ isOpen, onClose, amount, setAmount, onTopUp, loading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-200">
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
              onClose();
              setAmount('');
            }}
            className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onTopUp}
            disabled={loading || !amount || parseFloat(amount) < 100}
            className="flex-1 bg-blue-600 text-white py-3 cursor-pointer rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
          >
            {loading ? (
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
  );
}