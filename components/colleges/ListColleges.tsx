'use client';

import { ApiCaller } from '@/api';
import { useAuthContext } from '@/context/AuthContext';
import { ICollege, IUser } from '@/types';
import { Column } from '@material-table/core';
import { useQuery } from '@tanstack/react-query';
import { BasicDataTable } from '../ui/basic-datatable';
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
        <BasicDataTable<ICollege>
            resource="colleges"
            data={colleges ?? []}
            loading={busy}
            columns={columns}
            title="Manage Colleges"
            key={`colleges`}
        />
    )
}

export default ListColleges