'use client';

import { ApiCaller } from '@/api';
import { ISubject } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const ViewSubject = ({ id: subjectId }: { id?: string }) => {
  const { id } = useParams();
  const subjectIdParam = subjectId || id;

  const { data: subject, isLoading } = useQuery({
    queryKey: ['subject', subjectIdParam],
    queryFn: async () => {
      const res = await ApiCaller.get<ISubject>(`/subjects/${subjectIdParam}`);
      return res;
    },
    enabled: !!subjectIdParam,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form className="flex flex-col gap-2 p-4">
      <div className="flex flex-col">
        <label htmlFor="name">Subject Name</label>
        <span className="text-xl font-bold">{subject?.name || '-'}</span>
      </div>
      <div className="flex flex-col">
        <label htmlFor="specialty">Specialty</label>
        <span className="text-xl font-bold">
          {subject?.specialty?.name || '-'}
        </span>
      </div>
      <div className="flex flex-col">
        <label htmlFor="description">Subject Description</label>
        <span className="text-xl font-bold">{subject?.description || '-'}</span>
      </div>
    </form>
  );
};

export default ViewSubject;
