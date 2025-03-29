
"use client";

import { ApiCaller } from "@/api";
import DivContainer from "@/components/ui/container";
import ViewUser from "@/components/users/ViewUser";
import { IUser } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const ViewUserPage = () => {
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
        <DivContainer>
            <ViewUser user={user as IUser} />
        </DivContainer>
    )
}

export default ViewUserPage