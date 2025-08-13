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
    cell: ({ row }) => <p>{row?.original?.course?.name || row?.original?.course || 'N/A'}</p>,
  },
  {
    id: 'score',
    header: 'Score',
    cell: ({ row }) => {
      // Ensure questions is always an array
      const questions = Array.isArray(row?.original?.questions) 
        ? row.original.questions 
        : [];
        
      // Convert score to number safely
      const score = Number(row?.original?.score) || 0;
      
      // Calculate percentage safely
      const pct = questions.length > 0 ? (score * 100) / questions.length : 0;
      
      const colorClass =
        pct >= 80
          ? 'bg-green-100 text-green-800'
          : pct >= 60
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-red-100 text-red-800';
          
      return (
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${colorClass}`}>
          {questions.length ? `${Math.round(pct)}%` : 'n/a'}
        </span>
      );
    },
  },
  {
    id: 'questions',
    header: 'No Of Questions',
    cell: ({ row }) => {
      // Ensure questions is always an array
      const questions = Array.isArray(row?.original?.questions) 
        ? row.original.questions 
        : [];
      return <>{questions.length || 'n/a'}</>;
    },
  },
  {
    id: 'start_time',
    header: 'Scheduled Time',
    cell: ({ row }) => (
      <p>{row?.original?.start_time ? dayjs(row.original.start_time).format('DD/MM/YYYY') : 'N/A'}</p>
    ),
  },
];

function CreateTestModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="mx-auto w-full max-w-2xl rounded-lg bg-white p-6">
      <CreateTest />
    </Modal>
  );
}

// Enhanced utility function to handle paginated API responses
const safeToArray = (data) => {
  if (!data) return [];
  
  // Handle paginated responses with results array
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.results)) return data.results;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.data?.results)) return data.data.results;
  
  // Handle object responses
  if (typeof data === 'object') {
    // If it's a paginated response object
    if (data.results) return data.results;
    
    // Convert plain objects to array of values
    return Object.values(data);
  }
  
  return [];
};

export default function MyTests() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [safeRecords, setSafeRecords] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  // Destructure data and isLoading directly from useGetTests
  const { data: records, isLoading, refetch } = useGetTests();

  // Safely convert records to array format
  useEffect(() => {
    if (isLoading) return;
    
    const converted = safeToArray(records);
    console.log('API Records:', records);
    console.log('Converted records:', converted);
    setSafeRecords(converted);
  }, [records, isLoading]);

  const total = safeRecords.length;
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
      refetch();
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
            className="text-black"
            disabled={isLoading}
          >
            Create New Test
          </Button>
        </div>

        {isLoading ? (
          <DataTableSkeleton
            columnCount={columns.length}
            filterableColumnCount={1}
            searchableColumnCount={1}
          />
        ) : safeRecords.length === 0 ? (
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
              data={safeRecords} 
              pageCount={pageCount} 
            />
          </div>
        )}
      </div>

      <CreateTestModal isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  );
}
