'use client';

import { ApiCaller } from '@/api';
import { useAuthContext } from '@/context/AuthContext';
import { IUser } from '@/types';
import { Column } from '@material-table/core';
import { useQuery } from '@tanstack/react-query';
import { BasicDataTable } from '../ui/basic-datatable';
const ListUsers = () => {
    const { user, isBusy } = useAuthContext();
    const {
        data: users,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await ApiCaller.get<IUser[]>(
                `/users`,
            );
            return res || [];
        },
    });

    const columns: Column<IUser>[] = [
        {
            title: 'Full Name',
            field: 'fullName',
        }
    ];
    const busy = isLoading || isFetching || isBusy;

    return (
        <BasicDataTable<IUser>
            resource="users"
            data={users ?? []}
            loading={busy}
            columns={columns}
            title="Manage Users"
            key={`users`}
        />
    )
}

export default ListUsers