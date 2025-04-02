'use client';

import { ApiCaller } from '@/api';
import { useAuthContext } from '@/context/AuthContext';
import { IExamination } from '@/types';
import { Column } from '@material-table/core';
import { useQuery } from '@tanstack/react-query';
import { BasicDataTable } from '../ui/basic-datatable';
import CreateExamination from './CreateExamination';
import EditExamination from './EditExamination';
import ViewExamination from './ViewExamination';

const ListExaminations = () => {
  const { user, isBusy } = useAuthContext();
  const {
    data: examinations,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['examinations'],
    queryFn: async () => {
      const res = await ApiCaller.get<IExamination[]>(`/examinations`);
      return res || [];
    },
  });

  const columns: Column<IExamination>[] = [
    {
      title: 'Examination Title',
      field: 'title',
    },
    {
      title: 'College Name',
      field: 'college.collegeName',
    },
    {
      title: 'Subscriptions',
      field: 'subscriptions.length',
      render: (rowData) => {
        return rowData.subscriptions.length > 0 ? (
          <span>{rowData?.subscriptions.length}</span>
        ) : (
          <span className="text-red-500">No Subscriptions</span>
        );
      },
    },
  ];

  const busy = isLoading || isFetching || isBusy;

  return (
    <>
      <BasicDataTable<IExamination>
        resource="examinations"
        data={examinations ?? []}
        loading={busy}
        useDialog={true}
        addComponent={<CreateExamination />}
        editComponent={(id) => <EditExamination id={id} />}
        viewComponent={(id) => <ViewExamination id={id} />}
        columns={columns}
        title="Manage Examinations"
        key={`examinations`}
      />
    </>
  );
};

export default ListExaminations;
