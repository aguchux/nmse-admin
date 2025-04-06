'use client';

import { useAppDialog } from '@/context/DialogContext';
import GeneralBillingPayments from './GeneralBillingPayments';
import GeneralPreferences from './GeneralPreferences';
import GeneralProfile from './GeneralProfile';
import GeneralSocialMedia from './GeneralSocialMedia';

const SettingsEditor = () => {
  const { openDialog } = useAppDialog();
  return (
    <div className="w-full flex flex-col md:flex-row gap-3 justify-between items-stretch">
      <div className="w-full md:w-1/3 rounded-lg bg-gray-50 shadow-lg min-h-32 py-4">
        <h2 className="text-xl font-bold text-gray-600 px-4 my-2">General</h2>
        <hr className="border-b-4 border-b-red-600 my-1" />
        <div className="px-4 py-2">
          <p className="text-gray-500">
            Manage your general wesite and applicationsettings here.
          </p>
          <ul className="ml-4 mt-2 space-y-2 text-gray-600">
            <li>
              <button
                onClick={() =>
                  openDialog({
                    title: 'General Profile',
                    content: <GeneralProfile />,
                  })
                }
                className="links"
              >
                - Update profile information
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  openDialog({
                    title: 'General Profile',
                    content: <GeneralSocialMedia />,
                  })
                }
                className="links"
              >
                - Social Media Links
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  openDialog({
                    title: 'General Profile',
                    content: <GeneralPreferences />,
                  })
                }
                className="links"
              >
                - Application preferences
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  openDialog({
                    title: 'General Profile',
                    content: <GeneralBillingPayments />,
                  })
                }
                className="links"
              >
                - Billing & Payments
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full md:w-1/3 rounded-lg bg-gray-50 shadow-lg min-h-32 py-4">
        <h2 className="text-xl font-bold text-gray-600 px-4">Security</h2>
        <hr className="border-b-4 border-b-red-600 my-1" />
        <div className="px-4 py-2">
          <p className="text-gray-500 my-2">
            Manage your apps security settings and configurations.
          </p>
          <ul className="ml-4 mt-2 space-y-2 text-gray-600">
            <li>
              <button className="links">- Security Settings</button>
            </li>
            <li>
              <button className="links">- Change password</button>
            </li>
            <li>
              <button className="links">- 2FA Settings</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full md:w-1/3 rounded-lg bg-gray-50 shadow-lg min-h-32 py-4">
        <h2 className="text-xl font-bold text-gray-600 px-4 my-2">
          Notification (Email and SMS)
        </h2>
        <hr className="border-b-4 border-b-red-600 my-1" />
        <div className="px-4 py-2">
          <p className="text-gray-500">Manage your notification settings.</p>
          <ul className="ml-4 mt-2 space-y-2 text-gray-600">
            <li>
              <button className="links">- Notification preferences</button>
            </li>
            <li>
              <button className="links">- SMS Setting & API</button>
            </li>
            <li>
              <button className="links">- Email Settings</button>
            </li>
            <li>
              <button className="links">- PUSH Notifications</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SettingsEditor;
