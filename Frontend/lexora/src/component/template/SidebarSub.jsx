// SidebarSub.jsx
import React from 'react';
import {
  LayoutDashboard,
  Home,
  StickyNote,
  Layers,
  Calendar,
  LifeBuoy,
  Settings,
  FileCog,
  Users,
  BarChart3,
  FileCheck,
  Bell,
} from 'lucide-react';
import Sidebar, { SidebarItem, SidebarSubItem } from '../template/Sidebar';

export default function SidebarSub() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar>
          <SidebarItem icon={<Home size={20} />} text="Home" />
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />

          <SidebarItem icon={<StickyNote size={20} />} text="Projects" alwaysOpen={true}>
            <SidebarSubItem text="Active Projects" active />
            <SidebarSubItem text="Archived Projects" />
            <SidebarSubItem text="Templates" />
          </SidebarItem>

          <SidebarItem icon={<Calendar size={20} />} text="Calendar" />

          <SidebarItem icon={<Layers size={20} />} text="Tasks">
            <SidebarSubItem text="My Tasks" />
            <SidebarSubItem text="Assigned Tasks" />
            <SidebarSubItem text="Completed" />
          </SidebarItem>

          <SidebarItem icon={<Users size={20} />} text="Team">
            <SidebarSubItem text="Members" />
            <SidebarSubItem text="Permissions" />
          </SidebarItem>

          <SidebarItem icon={<BarChart3 size={20} />} text="Reports">
            <SidebarSubItem text="Analytics" />
            <SidebarSubItem text="Exports" />
            <SidebarSubItem text="Performance" />
          </SidebarItem>

          <SidebarItem icon={<Bell size={20} />} text="Notifications" alert />

          <hr className="my-3 border-gray-200" />

          <SidebarItem icon={<Settings size={20} />} text="Settings">
            <SidebarSubItem text="Account" />
            <SidebarSubItem text="Notifications" />
            <SidebarSubItem text="Appearance" />
          </SidebarItem>

          <SidebarItem icon={<FileCog size={20} />} text="Admin">
            <SidebarSubItem text="User Management" />
            <SidebarSubItem text="System Settings" />
          </SidebarItem>

          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
          <SidebarItem icon={<FileCheck size={20} />} text="Documentation" />
        </Sidebar>

        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-600">Your main content goes here</p>
          </div>
        </main>
      </div>
    </div>
  );
}
