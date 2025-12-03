import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Hook to check if user's features are unlocked
 * Returns activation status, monetization settings, and functions to verify codes
 */
export const useFeatureActivation = () => {
  const [status, setStatus] = useState(null);
  const [monetizationInfo, setMonetizationInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's activation status
  const fetchActivationStatus = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/monetization/activation/my_status/');
      setStatus(response.data);
      setError(null);
    } catch (err) {
      setError(err?.response?.data?.detail || 'Failed to fetch activation status');
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch monetization info
  const fetchMonetizationInfo = async () => {
    try {
      const response = await axios.get('/api/monetization/activation/monetization_info/');
      setMonetizationInfo(response.data);
    } catch (err) {
      console.error('Failed to fetch monetization info:', err);
    }
  };

  // Verify activation code
  const verifyCode = async (code) => {
    try {
      const response = await axios.post('/api/monetization/activation/verify_code/', {
        code: code.trim().toUpperCase()
      });
      setStatus(response.data.data);
      return { success: true, message: response.data.message };
    } catch (err) {
      return {
        success: false,
        message: err?.response?.data?.error || 'Invalid or already used code'
      };
    }
  };

  useEffect(() => {
    fetchActivationStatus();
    fetchMonetizationInfo();
  }, []);

  // Check if user is unlocked (or if monetization is disabled)
  const isUnlocked = status?.status === 'unlocked' || monetizationInfo?.is_enabled === false;

  return {
    status,
    monetizationInfo,
    loading,
    error,
    isUnlocked,
    verifyCode,
    refetch: fetchActivationStatus
  };
};
