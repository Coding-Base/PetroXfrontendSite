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
      // Prevent cached 304 responses by requesting fresh data
      const response = await axios.get('/api/monetization/activation/my_status/', {
        headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' }
      });
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
      // Prevent cached 304 responses by requesting fresh data
      const response = await axios.get('/api/monetization/activation/monetization_info/', {
        headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' }
      });
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

  // Determine unlocked state conservatively:
  // - While loading: treat as locked (not unlocked)
  // - If monetization info is unknown (null) after loading, be conservative and treat as enabled (locked)
  // - Otherwise user is unlocked if their status is 'unlocked' or monetization is explicitly disabled
  let isUnlocked = false;
  if (loading) {
    isUnlocked = false;
  } else {
    const monetizationEnabled = monetizationInfo?.is_enabled;
    if (monetizationInfo == null) {
      // unknown monetization state: default to locked unless user status says unlocked
      isUnlocked = status?.status === 'unlocked';
    } else {
      isUnlocked = status?.status === 'unlocked' || monetizationEnabled === false;
    }
  }

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
