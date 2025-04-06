'use client';

import { ApiCaller } from '@/api';
import { ICollege } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

const ViewCollege = ({ id: _id }: { id?: string }) => {
  const { id } = useParams();
  const idParam = _id || id;
  const [busy, setBusy] = React.useState(false);

  // Fetch college data
  const { data: college, isLoading } = useQuery({
    queryKey: ['college', idParam],
    queryFn: async () => {
      const res = await ApiCaller.get<ICollege>(`/colleges/${idParam}`);
      return res;
    },
    enabled: !!idParam,
  });

  const isBusy = isLoading || busy;

  // Handle form submission
  if (isBusy) {
    return <div>Loading...</div>;
  }
  return (
    <form className="flex flex-col gap-2 p-4">
      <div className="flex flex-col">
        <label htmlFor="collegeName">College Name</label>
        <span className="text-xl font-bold">{college?.collegeName || '-'}</span>
      </div>
      <div className="flex flex-col">
        <label htmlFor="collegeCode">College Code</label>
        <span className="text-xl font-bold">{college?.collegeCode || '-'}</span>
      </div>
      <div className="flex flex-col">
        <label htmlFor="collegeDescription">College Description</label>
        <span className="text-xl font-bold">{college?.description || '-'}</span>
      </div>
    </form>
  );
};

export default ViewCollege;
