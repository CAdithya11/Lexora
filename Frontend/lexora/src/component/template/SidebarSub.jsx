import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  StickyNote,
  Route,
  Layers,
  Calendar,
  LifeBuoy,
  Settings,
  FileCog,
  Users,
  BarChart3,
  FileCheck,
  Bell,
  ChevronDown,
  Search,
  ArrowLeft,
  Globe,
  Filter,
  TrendingUp,
  Briefcase,
} from 'lucide-react';
import Sidebar, { SidebarItem, SidebarSubItem } from '../template/Sidebar';

// Categories for the filter dropdown
const categories = [
  'Software Development & Engineering',
  'Data Science & Analytics',
  'Design & Creative',
  'Marketing & Communications',
  'Business & Management',
  'Healthcare & Medicine',
];

export default function SidebarSub() {
  const [selectedCategory, setSelectedCategory] = useState('Software Development & Engineering');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2025');
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  // Available years for the filter
  const years = ['2023', '2024', '2025', '2026'];

  return (
    <>
      <div className="h-screen flex-shrink-0">
        <Sidebar>
          
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />

          <SidebarItem icon={<StickyNote size={20} />} text="Projects" alwaysOpen={true}>
            <SidebarSubItem text="Active Projects" active />
            <SidebarSubItem text="Archived Projects" />
            <SidebarSubItem text="Templates" />
          </SidebarItem>

          <SidebarItem icon={<Calendar size={20} />} text="Calendar" />

          <SidebarItem icon={<Route size={20} />} text="Roadmaps">
             <SidebarSubItem text={<Link to="/searchRoadmap" >Roadmaps Generator</Link>} />
             <SidebarSubItem text={<Link to="/RoadmapDetails">Roadmap Details</Link>} />
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
      </div>
    </>
  );
}
