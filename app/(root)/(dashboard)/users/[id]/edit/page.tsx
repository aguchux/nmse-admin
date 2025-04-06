
"use client";

import { ApiCaller } from "@/api";
import {DivContainerFluid} from "@/components/ui/container";
import EditUser from "@/components/users/EditUser";
import { IUser } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const EditUserPage = () => {
    const params = useParams()
    const userId = params.id as string;

    const { data: user, isLoading } = useQuery({
        queryKey: ['user', userId],
        queryFn: async () => {
            return await ApiCaller.get<IUser>(`/users/${userId}`);
        },
    });

    if (isLoading) {
        return <div className="flex justify-center items-center h-full">Loading...</div>;
    }
    return (
        <DivContainerFluid>
            <EditUser />
        </DivContainerFluid>
    )
}

export default EditUserPage