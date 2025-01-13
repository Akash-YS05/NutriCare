import React from 'react';
import Link from 'next/link';
import { FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';

export const Sidebar = () => {
  return (
    <div className="w-64 h-screen fixed top-0 left-0 bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-lg font-bold">Hospital Admin</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        <SidebarNavItem href="/dashboard" icon={FaHome}>
          Dashboard
        </SidebarNavItem>
        <SidebarNavItem href="/patients/dashboard" icon={FaUser}>
          Patients
        </SidebarNavItem>
        <SidebarNavItem href="/logout" icon={FaSignOutAlt}>
          Logout
        </SidebarNavItem>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <p className="text-sm text-gray-400">&copy; 2025 Hospital Admin</p>
      </div>
    </div>
  );
};

const SidebarNavItem = ({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-700 transition"
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </Link>
  );
};
