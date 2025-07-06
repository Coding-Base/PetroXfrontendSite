import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/shared/breadcrumbs';
import Modal from '../components/ui/modal';
import { Button } from '../components/ui/button';
import CreateTest from '../components/shared/create-test';
import { useGetTests } from '@/hooks/tests';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import DataTable from '@/components/shared/data-table';
import dayjs from 'dayjs';

export const columns = [
  {
    id: 'course',
    header: 'Course',
    cell: ({ row }) => <p>{row.original.course}</p>,
  },
  {
    id: 'score',
    header: 'Score',
    cell: ({ row }) => {
      const pct =
        (row.original.score * 100) / row.original.questions?.length || 0;
      const colorClass =
        pct >= 80
          ? 'bg-green-100 text-green-800'
          : pct >= 60
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-red-100 text-red-800';
      return (
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${colorClass}`}>
          {row.original.questions?.length ? `${Math.round(pct)}%` : 'n/a'}
        </span>
      );
    },
  },
  {
    id: 'questions',
    header: 'No Of Questions',
    cell: ({ row }) => <>{row.original.questions?.length ?? 'n/a'}</>,
  },
  {
    id: 'start_time',
    header: 'Scheduled Time',
    cell: ({ row }) => (
      <p>{dayjs(row.original.start_time).format('DD/MM/YYYY')}</p>
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

export default function MyTests() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Destructure data and isLoading directly from useGetTests
  const { data: records = [], isLoading } = useGetTests();

  // Ensure records is always an array
  const recordsArray = Array.isArray(records) ? records : [];

  const total = recordsArray.length;
  const pageLimit = 10;
  const pageCount = Math.ceil(total / pageLimit);

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
          <Button onClick={() => setIsOpen(true)} className="text-black">
            Create New Test
          </Button>
        </div>

        {isLoading ? (
          <DataTableSkeleton
            columnCount={columns.length}
            filterableColumnCount={1}
            searchableColumnCount={1}
          />
        ) : recordsArray.length === 0 ? (
          <p className="mt-4 text-2xl text-gray-600">
            You haven't taken any tests yet.
          </p>
        ) : (
          <DataTable
            columns={columns}
            data={recordsArray}
            pageCount={pageCount}
          />
        )}
      </div>

      <CreateTestModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}