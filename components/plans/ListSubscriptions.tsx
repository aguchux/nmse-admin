'use client';

import { ApiCaller } from '@/api';
import { useAuthContext } from '@/context/AuthContext';
import { ISubscription } from '@/types';
import { Column } from '@material-table/core';
import { useQuery } from '@tanstack/react-query';
import { BasicDataTable } from '@/components/ui/basic-datatable';
const ListSubscriptions = () => {
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

export default ListSubscriptions