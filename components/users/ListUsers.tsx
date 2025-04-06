'use client';

import { ApiCaller } from '@/api';
import { useAuthContext } from '@/context/AuthContext';
import { useAppDialog } from '@/context/DialogContext';
import { IUser } from '@/types';
import { Column } from '@material-table/core';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { BasicDataTable } from '../ui/basic-datatable';
import EditUser from './EditUser';
import ViewUser from './ViewUser';

const ListUsers = () => {
    const queryClient = useQueryClient();
    const { openDialog } = useAppDialog();
    const { user, policy, isBusy } = useAuthContext();
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

    // const onDelete = async (id: string) => {
    //     // check if the user has permission to delete
    //     if (!policy?.delete) {
    //         Swal.fire(
    //             'Error!',
    //             'You are not authorized to delete this record.',
    //             'error',
    //         );
    //         return;
    //     }
    //     const result = await Swal.fire({
    //         title: 'Are you sure?',
    //         html: `You won't be able to revert this!`,
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!',
    //     });
    //     if (result.isConfirmed) {
    //         try {
    //             const deleted = await ApiCaller.delete<IUser>(`/users/${id}`);
    //             if (deleted) {
    //                 await queryClient.invalidateQueries({
    //                     queryKey: ['users', user?.id],
    //                 });
    //                 await Swal.fire(
    //                     'Deleted!',
    //                     'The record has been deleted.',
    //                     'success',
    //                 );
    //             }
    //         } catch (error) {
    //             console.log(error);
    //             Swal.fire(
    //                 'Error!',
    //                 'An error occurred while deleting the record.',
    //                 'error',
    //             );
    //         }
    //     }
    // };


    const columns: Column<IUser>[] = [
        {
            title: 'User Information',
            field: 'userInformation',
            render: (rowData) => (
                <div className="flex flex-col items-start">
                    <div className='font-bold'>{rowData.fullName}</div>
                    <div>{rowData.email}</div>
                    <div>{rowData.mobile}</div>
                    <div className="flex flex-row my-2 space-x-2">
                        <button className={`flex flex-col justify-center items-center text-white h-6 w-6 rounded-full text-sm ${rowData.policy.create ? 'bg-green-500' : ' bg-red-500'}`}>C</button>
                        <button className={`flex flex-col justify-center items-center text-white h-6 w-6 rounded-full text-sm ${rowData.policy.read ? 'bg-green-500' : ' bg-red-500'}`}>R</button>
                        <button className={`flex flex-col justify-center items-center text-white h-6 w-6 rounded-full text-sm ${rowData.policy.update ? 'bg-green-500' : ' bg-red-500'}`}>U</button>
                        <button className={`flex flex-col justify-center items-center text-white h-6 w-6 rounded-full text-sm ${rowData.policy.delete ? 'bg-green-500' : ' bg-red-500'}`}>D</button>
                    </div>
                </div>

            ),
        },
    ];

    const busy = isLoading || isFetching || isBusy;

    return (
        <>
            <BasicDataTable<IUser>
                resource="users"
                data={users ?? []}
                loading={busy}
                useDialog={true}
                viewComponent={(id) => <ViewUser id={id} />}
                editComponent={(id) => <EditUser id={id} />}
                columns={columns}
                title="Manage Users"
                key={`users`}
            />
        </>
    )
}


export default ListUsers