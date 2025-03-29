'use client';

import { ApiCaller } from '@/api';
import { useAuthContext } from '@/context/AuthContext';
import { ICollege } from '@/types';
import { Column } from '@material-table/core';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { DataTable } from '../ui/datatable';

const ListColleges = () => {
    const { user, isBusy } = useAuthContext();
    const {
        data: colleges,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ['colleges'],
        queryFn: async () => {
            const res = await ApiCaller.get<ICollege[]>(
                `/colleges`,
            );
            return res || [];
        },
    });

    const columns: Column<ICollege>[] = [
        {
            title: 'College Name',
            field: 'collegeName',
        }
    ];


    const busy = isLoading || isFetching || isBusy;

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2></h2>
                <Link href={`/colleges/create`}
                    aria-label="Add New Record"
                    onClick={() => { }}
                    className="text-white bg-blue-500 hover:bg-blue-700 p-2 flex items-center"
                >
                    <FaPlus size={15} className="mr-2" />
                    Add New
                </Link>
            </div>
            <DataTable<ICollege>
                resource="colleges"
                data={colleges ?? []}
                loading={busy}
                columns={columns}
                title="Manage Colleges"
                key={`colleges`}
            />
        </>

    )
}

export default ListColleges