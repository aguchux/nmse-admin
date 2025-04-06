'use client';

import { ApiCaller } from '@/api';
import { useAuthContext } from '@/context/AuthContext';
import { ISubscription } from '@/types';
import { Column } from '@material-table/core';
import { useQuery } from '@tanstack/react-query';
import { BasicDataTable } from '../ui/basic-datatable';
const ListPlans = () => {
    const { user, isBusy } = useAuthContext();
    const {
        data: subscriptions,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ['subscriptions'],
        queryFn: async () => {
            const res = await ApiCaller.get<ISubscription[]>(
                `/subscriptions`,
            );
            return res || [];
        },
    });
    const columns: Column<ISubscription>[] = [
        {
            title: 'Subscription',
            field: 'id',
        },
        {
            title: 'Actions',
            field: 'actions',
        }
    ];
    const busy = isLoading || isFetching || isBusy;

    return (
        <BasicDataTable<ISubscription>
            resource="subscriptions"
            data={subscriptions ?? []}
            loading={busy}
            columns={columns}
            title="Manage Subscriptions"
            key={`subscriptions`}
        />
    )
}

export default ListPlans