'use client';

import DashboardStats from "@/components/dashboard/dashboard-stats";
import DivContainer from "@/components/ui/container";
import { useAppDialog } from "@/context/DialogContext";

export default function Dashboard() {
  const { openDialog } = useAppDialog();

  return (
    <>
      <div className="p-4 w-full flex flex-col gap-4">
        <DashboardStats />
      </div>
      <DivContainer>
        <h1>
          Dashboard
        </h1>
        <button
          onClick={() => {
            openDialog({
              title: 'Edit User',
              content: <Dialog />,
            });
          }} >
          open dialoge
        </button>
      </DivContainer>
    </>
  );
}


const Dialog = () => {
  return (
    <div>
      Dialog
    </div>
  )
}