import React from 'react';
import Link from 'next/link';
import { FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Utensils } from 'lucide-react';

export const Sidebar = () => {
  return (
    <div className="w-20 md:w-64 h-screen fixed top-0 left-0 bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <Link href="/" className='flex gap-4 items-center'>
          <Utensils className='mx-2 md:m-0'></Utensils>
          <h1 className="hidden md:block md:text-lg font-bold">NutriCare</h1>
        </Link>
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
        <p className="text-sm text-gray-400">&copy; 2025 NutriCare</p>
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
      <span className='hidden md:block'>{children}</span>
    </Link>
  );
};
