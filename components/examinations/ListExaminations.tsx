'use client';

import { ApiCaller } from '@/api';
import { useAuthContext } from '@/context/AuthContext';
import { ICollege, IExamination } from '@/types';
import { Column } from '@material-table/core';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { DataTable } from '../ui/datatable';

const ListExaminations = () => {
    const { user, isBusy } = useAuthContext();
    const {
        data: examinations,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ['examinations'],
        queryFn: async () => {
            const res = await ApiCaller.get<IExamination[]>(
                `/examinations`,
            );
            return res || [];
        },
    });

    const columns: Column<IExamination>[] = [
        {
            title: 'Exam Name',
            field: 'examName',
        }
    ];


    const busy = isLoading || isFetching || isBusy;

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2></h2>
                <Link href={`/examinations/create`}
                    aria-label="Add New Record"
                    onClick={() => { }}
                    className="text-white bg-blue-500 hover:bg-blue-700 p-2 flex items-center"
                >
                    <FaPlus size={15} className="mr-2" />
                    Add New
                </Link>
            </div>
            <DataTable<IExamination>
                resource="examinations"
                data={examinations ?? []}
                loading={busy}
                columns={columns}
                title="Manage Examinations"
                key={`examinations`}
            />
        </>

    )
}

export default ListExaminations