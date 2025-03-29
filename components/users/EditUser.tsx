import { ApiCaller } from "@/api";
import { useAppDialog } from "@/context/DialogContext";
import { IPolicy, IUser } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
const EditUser = ({ user }: { user: IUser }) => {

    const queryClient = useQueryClient();
    const { closeDialog } = useAppDialog();
    const [isBusy, setIsBusy] = React.useState<boolean>(false);
    const [fullName, setFullName] = React.useState<string>(user.fullName || '');
    const [mobile, setMobile] = React.useState<string>(user.mobile || '');
    const [policy, setPolicy] = React.useState<Partial<IPolicy>>({
        create: user.policy.create || false,
        read: user.policy.read || false,
        update: user.policy.update || false,
        delete: user.policy.delete || false,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            fullName,
            mobile,
            policy: {
                create: policy.create,
                read: policy.read,
                update: policy.update,
                delete: policy.delete,
            },
        };
        setIsBusy(true);
        ApiCaller.patch<IUser>(`/users/${user.id}`, data).then(async (res) => {
            if (res) {
                await queryClient.invalidateQueries({
                    queryKey: ['users'],
                });
                await queryClient.invalidateQueries({
                    queryKey: ['user', user.id],
                });
                toast.success('User updated successfully');
            }
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            setIsBusy(false);
        });

    }
    return (
        <form className="p-4 relative" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col justify-start text-sm font-semibold items-start mt-2 w-full clear-both mb-5">

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        readOnly
                        disabled={true}
                        defaultValue={user.email}
                        className="w-full text-gray-700 h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 mb-5"
                    />

                    <label htmlFor="fullName" className="mt-2">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        disabled={isBusy}
                        required
                        onChange={(e) => setFullName(e.target.value)}
                        defaultValue={user.fullName}
                        className="w-full text-gray-700 h-10 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />

                    <label htmlFor="mobile" className="mt-2">Mobile</label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        disabled={isBusy}
                        defaultValue={user.mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full text-gray-700 h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />

                </div>


                <div className="flex flex-col text-sm font-semibold items-start mt-2">Edit Access Policy</div>

                <div className="flex flex-row my-2 space-x-2">
                    <button onClick={(e) => {
                        e.preventDefault();
                        setPolicy((prev) => ({ ...prev, create: !prev.create }));
                    }} className={`flex flex-col justify-center items-center text-white h-8 w-8 rounded-full text-base shadow-xl ${policy.create ? 'bg-green-500 hover:bg-green-500/50' : ' bg-red-500 hover:bg-red-500/50'}`}>C</button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setPolicy((prev) => ({ ...prev, read: !prev.read }));
                    }} className={`flex flex-col justify-center items-center text-white h-8 w-8 rounded-full text-base shadow-xl  ${policy.read ? 'bg-green-500 hover:bg-green-500/50' : ' bg-red-500 hover:bg-red-500/50'}`}>R</button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setPolicy((prev) => ({ ...prev, update: !prev.update }));
                    }} className={`flex flex-col justify-center items-center text-white h-8 w-8 rounded-full text-base shadow-xl ${policy.update ? 'bg-green-500 hover:bg-green-500/50' : ' bg-red-500 hover:bg-red-500/50'}`}>U</button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setPolicy((prev) => ({ ...prev, delete: !prev.delete }));
                    }} className={`flex flex-col justify-center items-center text-white h-8 w-8 rounded-full text-base shadow-xl ${policy.delete ? 'bg-green-500 hover:bg-green-500/50' : ' bg-red-500 hover:bg-red-500/50'}`}>D</button>
                </div>
            </div>
            <div className="mt-6 w-full clear-both flex justify-between items-center">
                <button disabled={isBusy} type="submit" className="btn text-lg">
                    {isBusy ? 'Saving Changes...' : 'Save Changes'}
                </button>
            </div>

        </form>
    )
}

export default EditUser