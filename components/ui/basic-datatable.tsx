'use client';

import { ApiCaller } from '@/api';
import { useAuthContext } from '@/context/AuthContext';
import { shortID } from '@/utils';
import MaterialTable, { Column } from '@material-table/core';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaEdit, FaListUl, FaTrash } from 'react-icons/fa';
import { IconBase } from 'react-icons/lib';
import Swal from 'sweetalert2';

type UiBasicDataTableProps<T extends object> = {
  resource?: string;
  title: string;
  data: T[];
  columns: Column<T>[];
  loading: boolean;
  onViewClick?: (id: string) => void;
  onUpdateClick?: (id: string) => void;
  onDeleteClick?: (id: string) => void;
};

// const lookup = { true: <><span>x</span></>, false: <><span>=</span></> };

export const BasicDataTable = <T extends object>({
  resource,
  title,
  data,
  columns,
  loading,
  onViewClick,
  onDeleteClick,
  onUpdateClick,
}: UiBasicDataTableProps<T>) => {
  const [selectedRow, setSelectedRow] = useState<string>('');
  const queryClient = useQueryClient();
  const { user, isBusy, policy } = useAuthContext();
  const router = useRouter();

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
    columns.find((col) => col.field === 'actions') || {
      title: 'Actions',
      field: 'actions',
      render: (rowData) => (
        <div className="flex space-x-4">
          <button
            aria-label="View Details"
            disabled={isBusy}
            onClick={() => {
              if (onViewClick) {
                onViewClick(rowData.id!);
              } else {
                onView(rowData.id!);
              }
            }}
            className="text-white bg-green-500 hover:bg-green-700 p-2"
          >
            <FaListUl size={15} />
          </button>
          <button
            aria-label="Edit Details"
            disabled={isBusy}
            onClick={() => {
              if (onUpdateClick) {
                onUpdateClick(rowData.id!);
              } else {
                onUpdate(rowData.id!);
              }
            }}
            className="text-white bg-blue-500 hover:bg-blue-700 p-2"
          >
            <FaEdit size={15} />
          </button>
          <button
            aria-label="Delete Record"
            onClick={() => {
              if (onDeleteClick) {
                onDeleteClick(rowData.id!);
              } else {
                onDelete(rowData.id!);
              }
            }}
            className={`p-2 ${policy?.delete ? 'text-white bg-red-500 hover:bg-red-700 cursor-pointer' : 'text-white bg-gray-500 hover:bg-gray-700 cursor-not-allowed'}`}
          >
            <FaTrash size={15} />
          </button>
        </div>
      ),
    },
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

  const onView = async (id: string) => {
    await router.push(`/${resource}/${id}`);
  };
  const onUpdate = async (id: string) => {
    // check if the user has permission to update
    if (!policy?.update) {
      Swal.fire(
        'Error!',
        'You are not authorized to update this record.',
        'error',
      );
      return;
    }
    await router.push(`/${resource}/${id}/edit`);
  };

  const onDelete = async (id: string) => {
    // check if the user has permission to delete
    if (!policy?.delete) {
      Swal.fire(
        'Error!',
        'You are not authorized to delete this record.',
        'error',
      );
      return;
    }
    const result = await Swal.fire({
      title: 'Are you sure?',
      html: `You won't be able to revert this! <br><strong>${resource}/${id}</strong>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
    if (result.isConfirmed) {
      try {
        const deleted = await ApiCaller.delete<T>(`/${resource}/${id}`);
        if (deleted) {
          await queryClient.invalidateQueries({
            queryKey: [resource, user?.id],
          });
          await Swal.fire(
            'Deleted!',
            'The record has been deleted.',
            'success',
          );
        }
      } catch (error) {
        console.log(error);
        Swal.fire(
          'Error!',
          'An error occurred while deleting the record.',
          'error',
        );
      }
    }
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
