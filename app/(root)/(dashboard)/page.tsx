'use client';

import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { Menu, MenuItem } from "@/components/ui/menu";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

const AdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-green-50 text-green-900">
      {/* Menu Column */}
      <div
        className={`absolute md:relative bg-green-700 text-white w-64 p-4 transition-transform md:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="text-xl font-bold mb-4">Admin Menu</h2>
        <Menu>
          <MenuItem>Dashboard</MenuItem>
          <MenuItem>Exams</MenuItem>
          <MenuItem>Users</MenuItem>
          <MenuItem>Settings</MenuItem>
        </Menu>
      </div>

      {/* Content Column */}
      <div className="flex-1 p-6">
        <Button className="md:hidden mb-4" onClick={() => setMenuOpen(!menuOpen)}>
          <MenuIcon />
        </Button>
        <Card>
          <h2 className="text-2xl font-bold">Dashboard Content</h2>
          <p>Manage exams, users, and settings from here.</p>
        </Card>
      </div>

      {/* AI Area Column */}
      <div className="w-72 p-4 bg-white border-l hidden lg:block">
        <h2 className="text-xl font-bold">AI Assistance</h2>
        <p>Get AI-powered insights and recommendations here.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
