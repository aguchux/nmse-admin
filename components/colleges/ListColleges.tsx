'use client';

import { ApiCaller } from '@/api';
import { useAuthContext } from '@/context/AuthContext';
import { useAppDialog } from '@/context/DialogContext';
import { ICollege } from '@/types';
import { Column } from '@material-table/core';
import { useQuery } from '@tanstack/react-query';
import { BasicDataTable } from '../ui/basic-datatable';
import AddCollege from './AddCollege';
import EditCollege from './EditCollege';
import ViewCollege from './ViewCollege';

const ListColleges = () => {
  const { user, isBusy } = useAuthContext();
  const { openDialog } = useAppDialog();
  const {
    data: colleges,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['colleges'],
    queryFn: async () => {
      const res = await ApiCaller.get<ICollege[]>(`/colleges`);
      return res || [];
    },
  });

  const columns: Column<ICollege>[] = [
    {
      title: 'Name',
      field: 'collegeName',
    },
    {
      title: 'Code',
      field: 'collegeCode',
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
      <BasicDataTable<ICollege>
        resource="colleges"
        data={colleges ?? []}
        loading={busy}
        useDialog={true}
        addComponent={<AddCollege />}
        editComponent={(id) => <EditCollege id={id} />}
        viewComponent={(id) => <ViewCollege id={id} />}
        columns={columns}
        title="Manage Colleges"
        key={`colleges`}
      />
    </>
  );
};

export default ListColleges;
