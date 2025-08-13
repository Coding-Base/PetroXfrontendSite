import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/shared/breadcrumbs';
import Modal from '../components/ui/modal';
import { Button } from '../components/ui/button';
import CreateTest from '../components/shared/create-test';
import { useGetTests } from '@/hooks/tests';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import dayjs from 'dayjs';
import DataTable from '../components/shared/data-table';

export const columns = [
  {
    id: 'course',
    header: 'Course',
    cell: ({ row }) => {
      // Handle both course object and course name
      const course = row.original.course;
      return <p>{course?.name || course || 'N/A'}</p>;
    },
  },
  {
    id: 'score',
    header: 'Score',
    cell: ({ row }) => {
      // Ensure questions is always an array
      const questions = Array.isArray(row.original.questions) 
        ? row.original.questions 
        : [];
        
      // Convert score to number safely
      const score = Number(row.original.score) || 0;
      
      // Calculate percentage safely
      const pct = questions.length > 0 ? Math.round((score * 100) / questions.length) : 0;
      
      const colorClass =
        pct >= 80
          ? 'bg-green-100 text-green-800'
          : pct >= 60
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-red-100 text-red-800';
          
      return (
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${colorClass}`}>
          {questions.length > 0 ? `${pct}%` : 'n/a'}
        </span>
      );
    },
  },
  {
    id: 'questions',
    header: 'No Of Questions',
    cell: ({ row }) => {
      // Ensure questions is always an array
      const questions = Array.isArray(row.original.questions) 
        ? row.original.questions 
        : [];
      return <>{questions.length || 'n/a'}</>;
    },
  },
  {
    id: 'start_time',
    header: 'Scheduled Time',
    cell: ({ row }) => (
      <p>{row.original.start_time ? dayjs(row.original.start_time).format('DD/MM/YYYY') : 'N/A'}</p>
    ),
  },
];

function CreateTestModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="mx-auto w-full max-w-2xl rounded-lg bg-white p-6">
      <CreateTest onTestCreated={onClose} />
    </Modal>
  );
}

// Enhanced utility function to handle paginated API responses
const extractTestData = (response) => {
  if (!response) return [];
  
  // Handle direct array response
  if (Array.isArray(response)) return response;
  
  // Handle paginated response with results array
  if (Array.isArray(response.results)) return response.results;
  
  // Handle nested data property
  if (response.data) {
    if (Array.isArray(response.data)) return response.data;
    if (Array.isArray(response.data.results)) return response.data.results;
  }
  
  // Handle other object types
  if (typeof response === 'object') {
    // Return the object itself if it looks like a test
    if (response.id && response.course) return [response];
    
    // Convert object values to array
    return Object.values(response);
  }
  
  return [];
};

export default function MyTests() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [testData, setTestData] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Destructure data and isLoading directly from useGetTests
  const { data: apiResponse, isLoading, refetch } = useGetTests();

  // Safely convert records to array format
  useEffect(() => {
    if (isLoading) return;
    
    const extractedData = extractTestData(apiResponse);
    console.log('API Response:', apiResponse);
    console.log('Extracted Test Data:', extractedData);
    
    setTestData(extractedData);
    setIsLoadingData(false);
  }, [apiResponse, isLoading]);

  const total = testData.length;
  const pageLimit = 10;
  const pageCount = Math.ceil(total / pageLimit);

  const handleCreateTest = () => {
    setIsCreating(true);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsCreating(false);
    // Refetch tests after creating a new one
    if (isCreating) {
      setIsLoadingData(true);
      refetch().then(() => setIsLoadingData(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto h-[100vh] overflow-y-auto rounded-xl bg-white p-6 shadow">
        <Breadcrumbs
          items={[
            { title: 'Dashboard', link: '/dashboard' },
            { title: 'My Tests', link: '/history' },
          ]}
          className="mb-4"
        />

        <div className="mb-4 flex justify-end">
          <Button 
            onClick={handleCreateTest} 
            className="bg-blue-600 text-white hover:bg-blue-700"
            disabled={isLoading || isLoadingData}
          >
            Create New Test
          </Button>
        </div>

        {isLoading || isLoadingData ? (
          <DataTableSkeleton
            columnCount={columns.length}
            filterableColumnCount={1}
            searchableColumnCount={1}
          />
        ) : testData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-4 h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No tests found</h3>
            <p className="text-gray-500 mb-4 text-center max-w-md">
              You haven't taken any tests yet. Create your first test to get started!
            </p>
            <Button 
              onClick={handleCreateTest} 
              className="bg-blue-600 text-white"
              disabled={isLoading}
            >
              Create First Test
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <DataTable 
              columns={columns} 
              data={testData} 
              pageCount={pageCount} 
            />
          </div>
        )}
      </div>

      <CreateTestModal isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  );
}
