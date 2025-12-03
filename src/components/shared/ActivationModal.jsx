import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

/**
 * Modal shown when user tries to access locked features
 * Displays payment instructions and code verification form
 */
export default function ActivationModal({ isOpen, onClose, monetizationInfo, onCodeSubmit, isVerifying = false }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!code.trim()) {
      setError('Please enter an activation code');
      return;
    }

    const result = await onCodeSubmit(code);
    if (result.success) {
      setSuccess(result.message);
      setCode('');
      // Close modal after short delay
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setError(result.message);
    }
  };

  if (!monetizationInfo) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Unlock Full PetroX Features</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Payment Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-3">
              To access the full features of PetroX, kindly make a payment of ₦{monetizationInfo.price} to the account details below:
            </p>
            
            <div className="bg-white p-3 rounded border border-gray-200 mb-3">
              <p className="text-sm font-mono text-gray-800">{monetizationInfo.payment_account}</p>
            </div>

            <p className="text-sm text-gray-600">
              After payment, forward the receipt to WhatsApp: <span className="font-semibold">{monetizationInfo.whatsapp_number}</span>
            </p>
            
            <p className="text-xs text-gray-500 mt-2">
              A code will be provided to you which you can enter below to unlock your account.
            </p>
          </div>

          {/* Code Verification Form */}
          <div className="border-t pt-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter activation code
                </label>
                <input
                  id="code"
                  type="text"
                  placeholder="E.g., ABC123DEF456"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError('');
                    setSuccess('');
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isVerifying}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-3 py-2 rounded">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying || !code.trim()}
                className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isVerifying ? 'Verifying...' : 'Verify Code'}
              </button>
            </form>
          </div>

          {/* Info Note */}
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
            <p className="text-xs text-yellow-800">
              💡 <span className="font-medium">Tip:</span> Keep your activation code safe. You'll only need to enter it once.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
