'use client';

import { ApiCaller } from '@/api';
import { IUser } from '@/types';
import { namesToAvatar, shortID, toNaira } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
const ViewUser = ({ id: _id }: { id?: string }) => {
  const { id } = useParams();
  const idParam = _id || id;

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', idParam],
    queryFn: async () => {
      const res = await ApiCaller.get<IUser>(
        `/users/${idParam}`,
      );
      return res! as IUser;
    },
    enabled: !!idParam,
  });

  if (isLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 relative">
      <div className="flex flex-col items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-blue-800 text-white mb-5 flex flex-col justify-center items-center font-bold text-4xl">
          {namesToAvatar(user.fullName)}
        </div>
        <div className="text-gray-700">{shortID(user.id)}</div>
        <div className="text-xl font-semibold">{user.fullName}</div>
        <div className="text-gray-700">{user.email}</div>
        {user.mobile && <div className="text-gray-700">{user.mobile}</div>}
        <hr className="border" />
        <div className="text-gray-50 my-1 rounded px-3 bg-gray-950 text-sm flex flex-col justify-center items-center border border-gray-900 shadow-xl">
          {user.role}
        </div>
        <div className="flex flex-col text-sm font-semibold items-start mt-2">
          Active Subscription
        </div>
        <div className="flex flex-row my-2 space-x-2">
          <Link href="#" className="text-blue-500 underline">
            Free Plan
          </Link>
        </div>

        <div className="flex flex-col text-sm font-semibold items-start mt-2">
          Wallet Ballance
        </div>

        <div className="flex flex-row my-2 space-x-2">
          <strong className="text-gray-700">{toNaira(34899.0)}</strong>
          <Link href="#" className="text-blue-500 underline">
            Add Funds
          </Link>
        </div>

        <div className="flex flex-col text-sm font-semibold items-start mt-2">
          Access Policy
        </div>
        <div className="flex flex-row my-2 space-x-2">
          <button
            className={`flex flex-col justify-center items-center text-white h-6 w-6 rounded-full text-sm ${user.policy.create ? 'bg-green-500' : ' bg-red-500'}`}
          >
            C
          </button>
          <button
            className={`flex flex-col justify-center items-center text-white h-6 w-6 rounded-full text-sm ${user.policy.read ? 'bg-green-500' : ' bg-red-500'}`}
          >
            R
          </button>
          <button
            className={`flex flex-col justify-center items-center text-white h-6 w-6 rounded-full text-sm ${user.policy.update ? 'bg-green-500' : ' bg-red-500'}`}
          >
            U
          </button>
          <button
            className={`flex flex-col justify-center items-center text-white h-6 w-6 rounded-full text-sm ${user.policy.delete ? 'bg-green-500' : ' bg-red-500'}`}
          >
            D
          </button>
        </div>
      </div>
      <div className="w-full flex flex-row justify-between items-center gap-2 touch-gray-700 text-sm mt-2 p-4">
        <span>
          JOINED:{' '}
          <strong>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}</strong>
        </span>
        <span className="text-gray-700">
          Updated:{' '}
          <strong>{new Date(user.updatedAt).toLocaleDateString()}</strong>
        </span>
      </div>
    </div>
  );
};

export default ViewUser;
