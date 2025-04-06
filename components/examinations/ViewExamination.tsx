'use client';

import { ApiCaller } from '@/api';
import { IExamination } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';

const ViewExamination = ({ id:_id }: { id?: string }) => {
  const { id } = useParams();
  const idParam = _id || id;
  const [busy, setBusy] = React.useState(false);

  // Fetch college data
  const { data: examination, isLoading } = useQuery({
    queryKey: ['examination', idParam],
    queryFn: async () => {
      const res = await ApiCaller.get<IExamination>(`/examinations/${idParam}`);
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
        <label htmlFor="title">Examination Title</label>
        <span className="text-xl font-bold">{examination?.title || '-'}</span>
      </div>
      <div className="flex flex-col">
        <label htmlFor="description">Examination Description</label>
        <span className="text-xl font-bold">
          {examination?.description || '-'}
        </span>
      </div>
      <div className="flex flex-col">
        <label htmlFor="college">College Description</label>
        <span className="text-xl font-bold">
          {examination?.college.collegeName || '-'}
        </span>
      </div>
    </form>
  );
};

export default ViewExamination;
