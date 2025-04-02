'use client';

import { ApiCaller } from '@/api';
import { useAuthContext } from '@/context/AuthContext';
import { IQuestion } from '@/types';
import { Column } from '@material-table/core';
import { useQuery } from '@tanstack/react-query';
import { BasicDataTable } from '../ui/basic-datatable';
const ListQuestionBanks = () => {
    const { user, isBusy } = useAuthContext();
    const {
        data: questions,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ['questions'],
        queryFn: async () => {
            const res = await ApiCaller.get<IQuestion[]>(
                `/questions`,
            );
            return res || [];
        },
    });

    const columns: Column<IQuestion>[] = [
        {
            title: 'Question',
            field: 'question',
        }
    ];
    const busy = isLoading || isFetching || isBusy;

    return (
        <BasicDataTable<IQuestion>
            resource="questions"
            data={questions ?? []}
            loading={busy}
            columns={columns}
            useDialog={true}
            title="Manage Questions"
            key={`questions`}
        />
    )
}

export default ListQuestionBanks