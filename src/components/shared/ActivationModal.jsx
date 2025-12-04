import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

/**
 * Modal shown when user tries to access locked features
 * Displays payment instructions and code verification form
 */
export default function ActivationModal({ isOpen, onClose, monetizationInfo, onCodeSubmit, isVerifying = false }) {
  if (!monetizationInfo) return null;
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCode, setShowCode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Please enter an activation code');
      return;
    }
    
    try {
      await onCodeSubmit(code);
      setSuccess('Code verified successfully!');
      setCode('');
    } catch (err) {
      setError(err.message || 'Invalid code. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Unlock Premium Features</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Payment Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded p-4 space-y-2">
            <p className="text-sm font-medium text-blue-900"> 💳 To have Full access to all the features of PetroX send  the sum of <span className="font-semibold">{monetizationInfo.price}</span> to  <span className="font-semibold">{monetizationInfo.payment_account}</span>
            </p>
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
                <div className="relative">
                  <input
                    id="code"
                    style={{color:'white'}}
                    type={showCode ? 'text' : 'password'}
                    inputMode="password"
                    placeholder="E.g., ABC123DEF456"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isVerifying || !code.trim()}
                  className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isVerifying ? 'Verifying...' : 'Verify Code'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    // clear state and close modal
                    setCode('');
                    setError('');
                    setSuccess('');
                    if (!isVerifying) onClose();
                  }}
                  disabled={isVerifying}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
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



