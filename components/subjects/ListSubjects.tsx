'use client';

import { ApiCaller } from '@/api';
import { useAuthContext } from '@/context/AuthContext';
import { ISubject } from '@/types';
import { Column } from '@material-table/core';
import { useQuery } from '@tanstack/react-query';
import { BasicDataTable } from '../ui/basic-datatable';
import AddSubject from './AddSubject';
import EditSubject from './EditSubject';
import ViewSubject from './ViewSubject';

const ListSubjects = () => {
  const { isBusy } = useAuthContext();

  const {
    data: subjects,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      const res = await ApiCaller.get<ISubject[]>(`/subjects`);
      return res || [];
    },
  });

  const columns: Column<ISubject>[] = [
    {
      title: 'Subject',
      field: 'name',
    },
    {
      title: 'Specialty',
      field: 'specialty.name',
      render: (rowData) => {
        return <span>{rowData.specialty?.name || '-'}</span>;
      },
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
      <BasicDataTable<ISubject>
        resource="subjects"
        data={subjects ?? []}
        loading={busy}
        columns={columns}
        useDialog={true}
        addComponent={<AddSubject />}
        editComponent={(id) => <EditSubject id={id} />}
        viewComponent={(id) => <ViewSubject id={id} />}
        title="Manage Subjects"
        key={`subjects`}
      />
    </>
  );
};

export default ListSubjects;
