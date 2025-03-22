'use client';

import DashboardStats from "@/components/dashboard/dashboard-stats";
import { useAppDialog } from "@/context/DialogContext";

export default function Dashboard() {
  const { openDialog } = useAppDialog();
  return (
    <div className="p-4 w-full flex flex-col gap-4">
      <DashboardStats />
      <button onClick={
        () => openDialog({
          title: 'Dialog Title',
          content: <Dialog />,
          size: 'xl'
        })
      } >
        Launch Dialog
      </button>
    </div>
  );
}


const Dialog = () => {
  return (
    <div>
      Dialog
    </div>
  )
}