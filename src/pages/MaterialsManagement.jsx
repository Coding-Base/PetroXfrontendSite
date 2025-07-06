import React, { useState, useEffect } from 'react';
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

  // Fetch courses on mount
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setIsLoadingCourses(true);
        const coursesData = await fetchCourses();

        // Normalize API response: support both array and { courses: [...] }
        const list = Array.isArray(coursesData)
          ? coursesData
          : (Array.isArray(coursesData?.courses) ? coursesData.courses : []);
        setCourses(list);
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
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB limit');
      } else {
        setError('');
        setFile(selectedFile);
      }
    }
  };

  const handleUpload = async () => {
    // Coerce to number
    const courseId = Number(selectedCourseId);
    if (!courseId || !materialName.trim() || !file) {
      setError('Please fill all required fields');
      return;
    }

    setIsUploading(true);
    setError('');
    setSuccessMsg('');

    const formData = new FormData();
    formData.append('course', courseId);
    formData.append('name', materialName.trim());
    formData.append('tags', tags.trim());
    formData.append('file', file);

    try {
      const response = await uploadMaterial(formData);
      setUploadedMaterials([response, ...uploadedMaterials]);

      // Reset form
      setMaterialName('');
      setTags('');
      setFile(null);
      setSelectedCourseId('');
      setSuccessMsg('Material uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err);
      setError(
        err.response?.data?.error?.message ||
        'Failed to upload material. Please try again.'
      );
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
      const results = await searchMaterials(searchQuery.trim());
      setSearchResults(Array.isArray(results) ? results : []);
      setMode('search-results');
      setShowMobileMenu(false);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search materials. Please try again.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleDownload = async (material) => {
    try {
      const downloadData = await downloadMaterial(material.id);

      const link = document.createElement('a');
      link.href = downloadData.download_url;
      link.setAttribute('download', material.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      const alreadyDownloaded = downloadedMaterials.some(item => item.id === material.id);
      if (!alreadyDownloaded) {
        const newDownloaded = [material, ...downloadedMaterials];
        setDownloadedMaterials(newDownloaded);
        localStorage.setItem('downloadedMaterials', JSON.stringify(newDownloaded));
      }
    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to download file. Please try again.');
    }
  };

  // File icon based on file type
  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    const iconClasses = 'h-10 w-10 p-1.5 rounded-lg md:h-12 md:w-12 md:p-2 md:rounded-xl';

    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
      return (
        <div className={`${iconClasses} bg-blue-100 text-blue-600`}>
          {/* image SVG */}
        </div>
      );
    } else if (ext === 'pdf') {
      return (
        <div className={`${iconClasses} bg-red-100 text-red-600`}>
          {/* pdf SVG */}
        </div>
      );
    } else if (['doc', 'docx'].includes(ext)) {
      return (
        <div className={`${iconClasses} bg-blue-100 text-blue-600`}>
          {/* doc SVG */}
        </div>
      );
    } else if (['ppt', 'pptx'].includes(ext)) {
      return (
        <div className={`${iconClasses} bg-orange-100 text-orange-600`}>
          {/* ppt SVG */}
        </div>
      );
    } else {
      return (
        <div className={`${iconClasses} bg-gray-100 text-gray-600`}>
          {/* generic SVG */}
        </div>
      );
    }
  };

  // Get course name by ID
  const getCourseName = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.name : 'Unknown Course';
  };

  if (isLoadingCourses) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-indigo-700">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Error/Success messages */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-6 rounded-lg bg-green-100 p-4 text-green-700">
            {successMsg}
          </div>
        )}

        {/* Mobile menu button */}
        <div className="mb-4 flex items-center justify-between md:hidden">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="rounded-lg bg-indigo-600 p-2 text-white"
            aria-label="Toggle menu"
          >
            {/* hamburger SVG */}
          </button>
          <h1 className="text-xl font-bold text-indigo-900">Study Materials</h1>
          <div className="w-10" />
        </div>

        <div className="mb-6 flex flex-col items-center justify-between gap-4 md:mb-8 md:flex-row">
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold text-indigo-900 md:text-3xl">
              Study Materials
            </h1>
            <p className="hidden text-indigo-600 md:block">
              Upload, search, and access learning resources
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-3 md:flex-row md:gap-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-indigo-200 bg-white py-2 pl-10 pr-4 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 md:rounded-xl md:py-3"
                placeholder="Search materials..."
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              {/* search icon SVG */}
            </div>

            <Button onClick={handleSearch} variant="primary" disabled={isSearching}>
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="mb-6 rounded-xl bg-white p-4 shadow-lg md:hidden">
            <button
              onClick={() => {
                setMode('upload');
                setShowMobileMenu(false);
              }}
              className={`mb-2 w-full rounded-lg px-4 py-3 text-center font-medium ${
                mode === 'upload'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white text-indigo-700 shadow hover:bg-indigo-50'
              }`}
            >
              Upload Material
            </button>
            <button
              onClick={() => {
                setMode('download');
                setShowMobileMenu(false);
              }}
              className={`mb-2 w-full rounded-lg px-4 py-3 text-center font-medium ${
                mode === 'download'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white text-indigo-700 shadow hover:bg-indigo-50'
              }`}
            >
              My Materials
            </button>
            <button
              onClick={() => {
                setMode('search-results');
                setShowMobileMenu(false);
              }}
              className={`w-full rounded-lg px-4 py-3 text-center font-medium ${
                mode === 'search-results'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white text-indigo-700 shadow hover:bg-indigo-50'
              }`}
            >
              Search Results
            </button>
          </div>
        )}

        {/* DESKTOP NAV */}
        <div className="mb-6 hidden space-x-2 md:mb-8 md:flex md:space-x-4">
          <button
            onClick={() => setMode('upload')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all md:rounded-xl md:px-6 md:py-3 md:text-base ${
              mode === 'upload'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                : 'bg-white text-indigo-700 shadow hover:bg-indigo-50'
            }`}
          >
            Upload Material
          </button>
          <button
            onClick={() => setMode('download')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all md:rounded-xl md:px-6 md:py-3 md:text-base ${
              mode === 'download'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                : 'bg-white text-indigo-700 shadow hover:bg-indigo-50'
            }`}
          >
            My Materials
          </button>
          <button
            onClick={() => setMode('search-results')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all md:rounded-xl md:px-6 md:py-3 md:text-base ${
              mode === 'search-results'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                : 'bg-white text-indigo-700 shadow hover:bg-indigo-50'
            }`}
          >
            Search Results
          </button>
        </div>

        {mode === 'upload' && (
          <div className="mb-6 rounded-xl border border-indigo-100 bg-white p-5 shadow-lg md:mb-8 md:rounded-2xl md:p-8 md:shadow-xl">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-indigo-800 md:mb-6 md:text-2xl">
              {/* upload icon SVG */}
              Upload New Material
            </h2>

            <div className="mb-4 grid grid-cols-1 gap-4 md:mb-6 md:gap-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-indigo-700 md:mb-2">
                  Course <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 md:rounded-xl md:px-4 md:py-3"
                  required
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-indigo-700 md:mb-2">
                  Material Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={materialName}
                  onChange={(e) => setMaterialName(e.target.value)}
                  className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 md:rounded-xl md:px-4 md:py-3"
                  placeholder="Enter material name"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-indigo-700 md:mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 md:rounded-xl md:px-4 md:py-3"
                  placeholder="e.g., math, calculus, formulas"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-indigo-700 md:mb-2">
                  File <span className="text-red-500">*</span>
                </label>
                <div className="flex w-full items-center justify-center">
                  <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-indigo-300 bg-indigo-50 hover:bg-indigo-100 md:rounded-2xl">
                    <div className="flex flex-col items-center justify-center p-4">
                      {/* file upload SVG */}
                      <p className="text-center text-xs font-medium text-indigo-600 md:text-sm">
                        {file ? file.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="mt-1 text-xs text-indigo-400">
                        Max file size: 10MB
                      </p>
                      {file?.size > 10 * 1024 * 1024 && (
                        <p className="mt-1 text-xs text-red-500">File too large! Max 10MB</p>
                      )}
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleUpload}
                disabled={isUploading || !file || !selectedCourseId || !materialName.trim()}
                className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm text-white shadow-lg transition-all hover:from-indigo-700 hover:to-purple-700 disabled:opacity-70 md:w-auto md:rounded-xl md:px-8 md:py-3 md:text-base"
              >
                {isUploading ? 'Uploading...' : 'Upload Material'}
              </button>
            </div>
          </div>
        )}

        {(mode === 'download' || mode === 'search-results') && (
          <div className="rounded-xl border border-indigo-100 bg-white p-4 shadow-lg md:rounded-2xl md:p-6 md:shadow-xl">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-indigo-800 md:mb-6 md:text-2xl">
              {(mode === 'search-results') ? 'Search Results' : 'My Materials'}
            </h2>

            {/* Empty states */}
            {mode === 'download' && downloadedMaterials.length === 0 && (
              <div className="rounded-lg border-2 border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 py-8 text-center md:rounded-2xl md:py-16">
                <p className="text-indigo-500">Download materials to see them here</p>
              </div>
            )}
            {mode === 'search-results' && searchResults.length === 0 && (
              <div className="rounded-lg border-2 border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 py-8 text-center md:rounded-2xl md:py-16">
                <p className="text-indigo-500">No materials found</p>
              </div>
            )}

            {/* Grid of materials */}
            {((mode === 'search-results' && searchResults.length > 0) ||
              (mode === 'download' && downloadedMaterials.length > 0)) && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {(mode === 'search-results' ? searchResults : downloadedMaterials).map((material) => {
                  const isDownloaded = downloadedMaterials.some(m => m.id === material.id);
                  return (
                    <div key={material.id} className="overflow-hidden rounded-lg border bg-white shadow hover:shadow-md">
                      {getFileIcon(material.name)}
                      <div className="p-4">
                        <h4 className="truncate font-bold">{material.name}</h4>
                        <p className="text-xs">{getCourseName(material.course)}</p>
                        {material.tags && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {material.tags.split(',').map((t,i) => (
                              <span key={i} className="rounded-full bg-indigo-100 px-2 text-xs">{t.trim()}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleDownload(material)}
                        className={`w-full px-4 py-2 text-sm text-white ${
                          isDownloaded ? 'bg-gray-500' : 'bg-emerald-500'
                        }`}
                      >
                        {isDownloaded ? 'Download Again' : 'Download'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
