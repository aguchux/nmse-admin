import { useAuthContext } from '@/context/AuthContext'
import { IUser } from '@/types'
import UserAvatar from './dashboard-user-avatar'

const DashboardHeader = () => {
    const { user, isBusy } = useAuthContext()
    if (isBusy) return null
    return (
        <>
            {/* Header & Profile */}
            <header className="flex flex-row justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Dashboard</h2>
                <UserAvatar user={user as IUser} />
            </header >
            {/* Header & Profile */}
        </>
    )
}

export default DashboardHeader