'use client';

import { useLogout } from "@/libs/actions/auth";
import { IUser } from '@/types';
import { namesToAvatar } from "@/utils";
import Link from 'next/link';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaCog, FaUser, FaUserLock } from "react-icons/fa";

const UserAvatar = ({ user }: {
    user: IUser
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const logoutMutation = useLogout();
    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                window.location.href = '/auth/signin';
            },
        });
    };

    return (
        <div className="relative z-[100]">
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)} className={`flex items-center space-x-2 pl-1 pr-2 rounded-full py-1 shadow-md border border-gray-200 ${dropdownOpen ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="bg-gray-800 hover:bg-gray-600 text-white rounded-full text-sm w-10 h-10 flex items-center justify-center">
                    {namesToAvatar(user?.fullName || '')}
                </div>
                <span className="text-gray-600">
                    {user?.fullName}
                </span>
                {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                    <Link href="/profile" className="px-4 py-2 text-gray-800 hover:bg-gray-200 w-full flex flex-row justify-start items-center gap-2">
                        <FaUser className="inline-block" />
                        <span>Profile</span></Link>
                    <Link href="/settings" className="px-4 py-2 text-gray-800 hover:bg-gray-200 w-full flex flex-row justify-start items-center gap-2">
                        <FaCog className="inline-block" />
                        <span>Settings</span>
                    </Link>
                    <Link onClick={handleLogout} href={'#'} className="px-4 py-2 text-gray-800 hover:bg-gray-200 w-full flex flex-row justify-start items-center gap-2">
                        <FaUserLock className="inline-block" />
                        <span>Logout</span>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default UserAvatar