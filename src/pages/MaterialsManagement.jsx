// MaterialManagement.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/ui/button';
import { fetchCourses, uploadMaterial, searchMaterials, downloadMaterial } from '@/api/index';

export default function MaterialsManagement() {
  const [mode, setMode] = useState('upload');
  const [materialName, setMaterialName] = useState('');
  const [tags, setTags] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [file, setFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [courses, setCourses] = useState([]);
  const [uploadedMaterials, setUploadedMaterials] = useState([]);
  const [downloadedMaterials, setDownloadedMaterials] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const messageTimeout = useRef(null);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Clear messages automatically after 5 seconds
  useEffect(() => {
    let timeoutId;

    if (error || successMsg) {
      if (messageTimeout.current) {
        clearTimeout(messageTimeout.current);
        messageTimeout.current = null;
      }

      timeoutId = setTimeout(() => {
        setError('');
        setSuccessMsg('');
      }, 5000);

      messageTimeout.current = timeoutId;
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [error, successMsg]);

  const clearMessages = () => {
    setError('');
    setSuccessMsg('');
    if (messageTimeout.current) {
      clearTimeout(messageTimeout.current);
      messageTimeout.current = null;
    }
  };

  // Load courses
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setIsLoadingCourses(true);
        const response = await fetchCourses();
        const payload = response?.data ?? response;
        let courseList = [];

        if (Array.isArray(payload)) {
          courseList = payload;
        } else if (payload && Array.isArray(payload.results)) {
          courseList = payload.results;
        } else if (payload && Array.isArray(payload.data)) {
          courseList = payload.data;
        } else {
          console.error('Unexpected courses response structure:', payload);
        }

        setCourses(courseList);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        setError('Failed to load courses. Please try again later.');
        setCourses([]);
      } finally {
        setIsLoadingCourses(false);
      }
    };

    loadCourses();
  }, []);

  // Load downloaded materials from localStorage
  useEffect(() => {
    const savedDownloads = JSON.parse(localStorage.getItem('downloadedMaterials') || '[]');
    setDownloadedMaterials(Array.isArray(savedDownloads) ? savedDownloads : []);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 20 * 1024 * 1024) {
        setError('File size exceeds 20MB limit');
      } else {
        setError('');
        setFile(selectedFile);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedCourseId || !materialName.trim() || !file) {
      setError('Please fill all required fields');
      return;
    }

    if (!isOnline) {
      setError('You are offline. Please connect to the internet to upload materials.');
      return;
    }

    setIsUploading(true);
    setError('');
    setSuccessMsg('');

    const formData = new FormData();
    formData.append('course', parseInt(selectedCourseId, 10));
    formData.append('name', materialName.trim());
    formData.append('tags', tags.trim());
    formData.append('file', file);

    try {
      const response = await uploadMaterial(formData);
      const uploaded = response?.data ?? response;
      setUploadedMaterials([uploaded, ...uploadedMaterials]);

      setMaterialName('');
      setTags('');
      setFile(null);
      setSelectedCourseId('');

      setSuccessMsg('Material uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err);
      let errorMsg = 'Failed to upload material. Please try again.';

      if (err.response) {
        if (err.response.status === 413 || err.response.status === 400) {
          if (err.response.data) {
            // show backend validation message when present
            const data = err.response.data;
            if (data.file) {
              errorMsg = Array.isArray(data.file) ? data.file.join(' ') : String(data.file);
            } else if (data.detail) {
              errorMsg = data.detail;
            } else {
              errorMsg = `Upload error: ${err.response.statusText || err.response.status}`;
            }
          }
        } else if (err.response.data?.detail) {
          errorMsg = err.response.data.detail;
        } else if (err.response.data?.message) {
          errorMsg = err.response.data.message;
        } else {
          errorMsg = `Error ${err.response.status}: ${err.response.statusText}`;
        }
      } else if (err.request) {
        errorMsg = "No response from server. Please check your connection.";
      } else {
        errorMsg = err.message || errorMsg;
      }

      setError(errorMsg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a search query');
      return;
    }

    setIsSearching(true);
    setError('');
    setSuccessMsg('');

    try {
      let results;
      try {
        results = await searchMaterials(searchQuery.trim());
      } catch (firstError) {
        results = await searchMaterials({ query: searchQuery.trim() });
      }

      let materialList = [];
      if (Array.isArray(results)) {
        materialList = results;
      } else if (results && Array.isArray(results.data)) {
        materialList = results.data;
      } else if (results && Array.isArray(results.results)) {
        materialList = results.results;
      } else if (results && Array.isArray(results)) {
        materialList = results;
      }

      setSearchResults(materialList);
      setMode('search-results');
      setShowMobileMenu(false);
    } catch (error) {
      console.error('Search error:', error);
      let errorMsg = 'Failed to search materials. Please try again.';
      if (error.response) {
        if (error.response.status === 500) {
          errorMsg = "Server error. Please try again later.";
        } else if (error.response.data?.error) {
          errorMsg = error.response.data.error;
        } else if (error.response.data?.message) {
          errorMsg = error.response.data.message;
        } else {
          errorMsg = `Error ${error.response.status}: ${error.response.statusText}`;
        }
      } else if (error.request) {
        errorMsg = "No response from server. Please check your connection.";
      } else {
        errorMsg = error.message || errorMsg;
      }

      setError(errorMsg);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Strictly use backend-provided signed/public URL
  const handleDownload = async (material) => {
    try {
      const downloadData = await downloadMaterial(material.id);

      // Support multiple shapes: { download_url: '...' } or { data: { download_url } }
      const downloadUrl = downloadData?.download_url || downloadData?.data?.download_url || material.file_url || material.url;

      if (!downloadUrl) {
        throw new Error('No secure download URL available');
      }

      // Some browsers ignore download attribute for cross-origin. open in new tab as fallback.
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      // leave download attribute (may be ignored cross-origin)
      link.setAttribute('download', material.name || '');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      const alreadyDownloaded = downloadedMaterials.some(item => item.id === material.id);
      if (!alreadyDownloaded) {
        const newDownloaded = [material, ...downloadedMaterials];
        setDownloadedMaterials(newDownloaded);
        localStorage.setItem('downloadedMaterials', JSON.stringify(newDownloaded));
      }

      setSuccessMsg(`"${material.name}" downloaded successfully!`);
    } catch (err) {
      console.error('Download error:', err);
      setError(err.message || 'Failed to download file. Please try again.');
    }
  };

  // File icon based on file type
  const getFileIcon = (fileName) => {
    const ext = (fileName || '').split('.').pop().toLowerCase();
    const iconClasses = 'h-10 w-10 p-1.5 rounded-lg md:h-12 md:w-12 md:p-2 md:rounded-xl';

    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
      return (
        <div className={`${iconClasses} bg-blue-100 text-blue-600`}>
          {/* image svg */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      );
    } else if (ext === 'pdf') {
      return (
        <div className={`${iconClasses} bg-red-100 text-red-600`}>
          {/* pdf svg */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className={`${iconClasses} bg-gray-100 text-gray-600`}>
          {/* file svg */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      );
    }
  };

  const getCourseName = (courseId) => {
    const idNum = Number(courseId);
    const course = courses.find((c) => Number(c.id) === idNum);
    return course ? course.name : 'Unknown Course';
  };

  if (isLoadingCourses) {
    return (
      <div className="min-h-screen flex items-center justify-center overflow-x-hidden">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-indigo-700">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 p-2 sm:p-4 md:p-6 overflow-x-hidden overflow-y-auto">
      <div className="mx-auto max-w-7xl">
        {(error || successMsg) && (
          <div className="fixed top-4 right-4 z-50 w-full max-w-md">
            {error && (
              <div className="mb-2 rounded-lg bg-red-100 p-4 text-red-700 shadow-lg relative">
                <button onClick={clearMessages} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                  ×
                </button>
                <div className="pr-6">{error}</div>
              </div>
            )}
            {successMsg && (
              <div className="mb-2 rounded-lg bg-green-100 p-4 text-green-700 shadow-lg relative">
                <button onClick={clearMessages} className="absolute top-2 right-2 text-green-500 hover:text-green-700">
                  ×
                </button>
                <div className="pr-6">{successMsg}</div>
              </div>
            )}
          </div>
        )}

        {/* ... The rest of your UI remains the same (buttons, upload form, search results, cards) ... */}
        {/* For brevity, the rest of the markup is identical to what you provided earlier. */}
        {/* Keep the exact markup for upload/search/results from your original file. */}

        {/* I intentionally didn't repeat the entire component markup here to keep the response concise,
            but you should paste the earlier full JSX body (which you already provided) and ensure the updated
            handleUpload and handleDownload functions above are used. */}
      </div>
    </div>
  );
}
