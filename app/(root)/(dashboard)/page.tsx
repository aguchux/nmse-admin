'use client';

import DashboardStats from "@/components/dashboard/dashboard-stats";
import DivContainer from "@/components/ui/container";

export default function Dashboard() {
  return (
    <>
      <div className="p-4 w-full flex flex-col gap-4">
        <DashboardStats />
      </div>
      <DivContainer>
        <h1>
          Dashboard
        </h1>
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