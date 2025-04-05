'use client';

import { ApiCaller } from '@/api';
import { ISpecialty } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const ViewSpecialty = ({ id: specialtyId }: { id?: string }) => {
  const { id } = useParams();
  const specialtyIdParam = specialtyId || id;

  const { data: specialty, isLoading } = useQuery({
    queryKey: ['specialty', specialtyIdParam],
    queryFn: async () => {
      const res = await ApiCaller.get<ISpecialty>(
        `/specialties/${specialtyIdParam}`,
      );
      return res;
    },
    enabled: !!specialtyIdParam,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form className="flex flex-col gap-2 p-4">
      <div className="flex flex-col">
        <label htmlFor="name">Specialty Name</label>
        <span className="text-xl font-bold">{specialty?.name || '-'}</span>
      </div>
      <div className="flex flex-col">
        <label htmlFor="description">Specialty Description</label>
        <span className="text-xl font-bold">
          {specialty?.description || '-'}
        </span>
      </div>
      <div className="flex flex-col">
        <label htmlFor="college">College</label>
        <span className="text-xl font-bold">
          {specialty?.college.collegeName || '-'}
        </span>
      </div>
    </form>
  );
};

export default ViewSpecialty;
