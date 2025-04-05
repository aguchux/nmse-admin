'use client';

import DashboardHeader from '@/components/dashboard/dashboard-header';
import { mainMenus } from '@/config';
import { useLogout } from '@/libs/actions/auth';
import { useAppState } from '@/store';
import Link from 'next/link';
import { FaChevronDown, FaChevronUp, FaUser, FaUserLock } from 'react-icons/fa';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [appState, setAppState] = useAppState();

  // const { fcmToken, isNotificationAllowed } = useFCMNotifications();
  // useLayoutEffect(() => {
  //   if (isNotificationAllowed) {
  //     console.log('Push notifications are enabled!');
  //   }
  // }, [isNotificationAllowed]);

  const logoutMutation = useLogout();
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        window.location.href = '/auth/signin';
      },
    });
  };
  return (
    <div className="flex h-screen justify-between items-stretch bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl text-white font-bold my-6">[NMSE].Admin</h1>
          <ul className="space-y-1">
            {mainMenus.map((menu, index) => {
              const Icon = menu.icon;
              const hasChildren = menu.children.length > 0;
              return (
                <div className="w-full" key={index}>
                  {hasChildren ? (
                    <li
                      key={index}
                      className={`py-2 px-3 flex flex-col justify-between items-center cursor-pointer text-gray-500 hover:bg-gray-800/70 hover:text-white ${
                        appState.selectedMenu.id === menu.id
                          ? 'bg-gray-800/70 text-white'
                          : ''
                      }`}
                      onClick={() =>
                        setAppState((prev) => ({
                          ...prev,
                          selectedMenu: menu,
                        }))
                      }
                    >
                      <div className="flex flex-row justify-between items-center gap-2 w-full">
                        <div className="flex flex-row justify-start items-center gap-2">
                          <Icon className="inline-block" />
                          <span>{menu.title}</span>
                        </div>
                        {appState.selectedMenu === menu ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </div>
                      {appState.selectedMenu.id === menu.id && (
                        <ul className="pl-5 w-full clear-both">
                          {menu.children.map((submenu, index) => {
                            return (
                              <li
                                key={index}
                                className="py-2 px-3 hover:bg-gray-800/70 text-gray-500 hover:text-white flex flex-row justify-between items-center gap-2 cursor-pointer w-full"
                              >
                                <Link href={submenu.link}>
                                  - {submenu.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  ) : (
                    <li
                      onClick={() =>
                        setAppState((prev) => ({
                          ...prev,
                          selectedMenu: menu,
                        }))
                      }
                      className={`py-2 px-3 flex flex-row gap-2 justify-start items-center cursor-pointer text-gray-500 hover:bg-gray-800/70 hover:text-white ${
                        appState.selectedMenu.id === menu.id
                          ? 'bg-gray-800/70 text-white'
                          : ''
                      }`}
                    >
                      <Icon className="inline-block" />
                      <Link href={menu.link}>{menu.title}</Link>
                    </li>
                  )}
                </div>
              );
            })}
          </ul>
        </div>
        <div className="space-y-1">
          .
          <Link
            href="/settings"
            className="px-4 py-2 text-gray-500 hover:bg-gray-800/70 hover:text-white flex flex-row justify-start items-center gap-2"
          >
            <FaUser className="inline-block" />
            <span>Profile & Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 w-full text-gray-500 hover:bg-gray-800/70 hover:text-white flex flex-row justify-start items-center gap-2"
          >
            <FaUserLock className="inline-block" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <DashboardHeader />
        {/* Content */}
        {children}
        {/* Content */}
      </main>
    </div>
  );
}
