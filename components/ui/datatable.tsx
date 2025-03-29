'use client';

import { useAuthContext } from '@/context/AuthContext';
import { shortID } from '@/utils';
import MaterialTable, { Column } from '@material-table/core';
import { useState } from 'react';
import { IconBase } from 'react-icons/lib';

type DataTableProps<T extends object> = {
  resource?: string;
  title: string;
  data: T[];
  columns: Column<T>[];
  loading: boolean;
};

// const lookup = { true: <><span>x</span></>, false: <><span>=</span></> };

export const DataTable = <T extends object>({
  resource,
  title,
  data,
  columns,
  loading,
}: DataTableProps<T>) => {
  const [selectedRow, setSelectedRow] = useState<string>('');
  const { isBusy } = useAuthContext();

  const extendedColumns: Column<T & { id?: string }>[] = [
    {
      title: 'ID',
      field: 'id',
      render: (rowData) => (
        <div className="flex flex-row items-center space-x-2">
          <button
            aria-label="Select Row"
            disabled={isBusy}
            className="bg-gray-500 hover:bg-blue-500/40 h-6 w-6 rounded-full"
            onClick={() => {
              const row = rowData as T & { id?: string };
              setSelectedRow(row.id || '');
            }}
          ></button>
          <span>{shortID(rowData?.id ?? '')}</span>
        </div>
      ),
    },
    ...columns,
  ];

  const options = {
    paging: true,
    pageSize: 10,
    exportButton: true,
    selection: true,
    sorting: true,
    exportAllData: true,
    IconBase: IconBase,
    emptyRowsWhenPaging: false,
    pageSizeOptions: [10, 100, 200, 300, 400],
    headerStyle: {
      fontWeight: 'bold',
      backgroundColor: '#244067',
      color: '#FFF',
      hover: {
        backgroundColor: '#244067',
        color: '#FFF',
      },
    },
    rowStyle: (rowData: T & { id?: string }) => ({
      backgroundColor: selectedRow === rowData.id ? '#F3F4F6' : '',
    }),
  };

  return (
    <>

      <MaterialTable
        title={title}
        isLoading={loading}
        style={{
          boxShadow: 'none',
        }}
        data={data}
        options={options}
        columns={extendedColumns}
        onRowClick={(evt, rowData) => {
          if (rowData) {
            const row = rowData as T & { id?: string };
            setSelectedRow(row.id || '');
          }
        }}
      />
    </>
  );
};
