'use client';
import { toNaira } from "@/utils";
import { FaUsers } from "react-icons/fa";
import { IoHelpCircleSharp, IoWallet } from "react-icons/io5";
const DashboardStats = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-6" >
            <div className="p-4 bg-white rounded shadow flex items-center">
                <FaUsers className="text-purple-500 text-3xl mr-4" />
                <div>
                    <h3 className="text-gray-600">Accounts & Signups</h3>
                    <p className="text-xl font-bold">5,645</p>
                </div>
            </div>


            <div className="p-4 bg-white rounded shadow flex items-center">
                <FaUsers className="text-blue-500 text-3xl mr-4" />
                <div>
                    <h3 className="text-gray-600">Subscriptions</h3>
                    <p className="text-xl font-bold">2,025</p>
                </div>
            </div>
            <div className="p-4 bg-white rounded shadow flex items-center">
                <IoHelpCircleSharp className="text-red-500 text-3xl mr-4" />
                <div>
                    <h3 className="text-gray-600">Tests Taken</h3>
                    <p className="text-xl font-bold">8,025</p>
                </div>
            </div>

            <div className="p-4 bg-white rounded shadow flex items-center">
                <IoWallet className="text-green-500 text-3xl mr-4" />
                <div>
                    <h3 className="text-gray-600">Total Revenue</h3>
                    <p className="text-xl font-bold">{toNaira(14025)}</p>
                </div>
            </div>

        </section>
    )
}

export default DashboardStats