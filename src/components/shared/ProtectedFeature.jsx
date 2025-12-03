import React, { useState } from 'react';
import { useFeatureActivation } from '@/hooks/useFeatureActivation';
import ActivationModal from './ActivationModal';

/**
 * Higher-order component that wraps a feature/component
 * Shows activation modal if user doesn't have access
 * Use: <ProtectedFeature><YourComponent /></ProtectedFeature>
 */
export default function ProtectedFeature({ children }) {
  const { isUnlocked, monetizationInfo, verifyCode } = useFeatureActivation();
  const [showModal, setShowModal] = useState(!isUnlocked);
  const [isVerifying, setIsVerifying] = useState(false);

  if (isUnlocked) {
    // Feature is unlocked, render children normally
    return children;
  }

  const handleCodeSubmit = async (code) => {
    setIsVerifying(true);
    try {
      const result = await verifyCode(code);
      if (result.success) {
        setShowModal(false);
      }
      return result;
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <>
      {/* Show placeholder when feature is locked */}
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Feature Locked</h2>
          <p className="text-gray-600">
            This feature is currently locked. Click the button below to unlock it.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Unlock Now
          </button>
        </div>
      </div>

      {/* Activation Modal */}
      <ActivationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        monetizationInfo={monetizationInfo}
        onCodeSubmit={handleCodeSubmit}
        isVerifying={isVerifying}
      />
    </>
  );
}
