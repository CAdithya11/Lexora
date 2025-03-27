import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  Database,
  DatabaseZapIcon,
  DatabaseBackupIcon,
  AlignVerticalJustifyCenter,
  BarChart2,
  BarChart4Icon,
  UserSearch,
  User,
  LogOut,
} from 'lucide-react';
import Sidebar, { SidebarItem, SidebarSubItem } from '../template/Sidebar';
import { authService } from '../../services/AuthService';

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
  const location = useLocation();

  const isLocation = location.pathname;

  // Available years for the filter
  const years = ['2023', '2024', '2025', '2026'];

  return (
    <>
      <div className="h-screen flex-shrink-0">
        <Sidebar>
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" />

          <hr className="my-3 border-gray-200" />

          <SidebarItem
            icon={<Route size={20} />}
            text="Roadmaps"
            alwaysOpen={
              isLocation == '/roadmap' || isLocation == '/RoadmapDetails' || isLocation == '/searchRoadmap'
                ? true
                : false
            }
          >
            <Link to="/searchRoadmap">
              <SidebarSubItem text="Roadmaps Generator" active={isLocation == '/searchRoadmap'} />
            </Link>
            <Link to="/RoadmapDetails">
              <SidebarSubItem text="Roadmap Details" active={isLocation == '/RoadmapDetails'} />
            </Link>
          </SidebarItem>

          <SidebarItem icon={<Users size={20} />} text="Mentoring Sessions">
            <SidebarSubItem text="Members" />
            <SidebarSubItem text="Permissions" />
          </SidebarItem>

          <SidebarItem
            icon={<BarChart4Icon size={20} />}
            text="Industry Insights"
            alwaysOpen={isLocation == '/jobtrendings' ? true : false}
          >
            <Link to="/jobtrendings">
              <SidebarSubItem text="Job Trends" active />
            </Link>
            <Link to="/jobtrendings">
              <SidebarSubItem text="Skill Trends" active />
            </Link>
            <Link to="/jobtrendings">
              <SidebarSubItem text="Salary Trends" active />
            </Link>
          </SidebarItem>

          <SidebarItem icon={<AlignVerticalJustifyCenter size={20} />} text="Skill Gap Analyzer">
            <SidebarSubItem text="Anlyzer" />
            <SidebarSubItem text="Completed" />
          </SidebarItem>

          <SidebarItem icon={<UserSearch size={20} />} text="Persona Matcher">
            <SidebarSubItem text="Anlyzer" />
            <SidebarSubItem text="Completed" />
          </SidebarItem>

          <hr className="my-3 border-gray-200" />

          <SidebarItem icon={<Bell size={20} />} text="Notifications" alert />

          <SidebarItem icon={<User size={20} />} text="Mentor" alwaysOpen={isLocation}>
            <SidebarSubItem text="Dashboard" />
            <SidebarSubItem text="Sessions" />
          </SidebarItem>

          <SidebarItem icon={<FileCog size={20} />} text="Admin">
            <SidebarSubItem text="Mentor Varification" />
            <SidebarSubItem text="Feedback" />
          </SidebarItem>

          <SidebarItem icon={<Settings size={20} />} text="Settings" alwaysOpen={true}>
            <SidebarSubItem text="Profile" />
            <SidebarSubItem text="Change Password" />
            <SidebarSubItem text="Proffesional Profile" />
          </SidebarItem>
          <div onClick={() => authService.logout()}>
            <SidebarItem icon={<LogOut size={20} />} text="Logout"></SidebarItem>
          </div>
        </Sidebar>
      </div>
    </>
  );
}
