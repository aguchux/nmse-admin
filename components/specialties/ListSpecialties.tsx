'use client';

import { ApiCaller } from '@/api';
import { useAuthContext } from '@/context/AuthContext';
import { ISpecialty } from '@/types';
import { Column } from '@material-table/core';
import { useQuery } from '@tanstack/react-query';
import { BasicDataTable } from '../ui/basic-datatable';
import AddSpecialty from './AddSpecialty';
import EditSpecialty from './EditSpecialty';
import ViewSpecialty from './ViewSpecialty';

const ListSpecialties = () => {
  const { isBusy } = useAuthContext();

  const {
    data: specialties,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['specialties'],
    queryFn: async () => {
      const res = await ApiCaller.get<ISpecialty[]>(`/specialties`);
      return res || [];
    },
  });

  const columns: Column<ISpecialty>[] = [
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Description',
      field: 'description',
      render: (rowData) => {
        return <span>{rowData.description || '-'}</span>;
      },
    },
  ];

  const busy = isLoading || isFetching || isBusy;

  return (
    <>
      <BasicDataTable<ISpecialty>
        resource="specialties"
        data={specialties ?? []}
        loading={busy}
        columns={columns}
        useDialog={true}
        addComponent={<AddSpecialty />}
        editComponent={(id) => <EditSpecialty id={id} />}
        viewComponent={(id) => <ViewSpecialty id={id} />}
        title="Manage Specialties"
        key={`specialties`}
      />
    </>
  );
};

export default ListSpecialties;
