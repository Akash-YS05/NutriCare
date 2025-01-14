"use client"

import { Sidebar } from '@/components/ui/Sidebar';
import { FaClipboardList, FaUser, FaBell } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';

export default function DashboardPage() {
  const [delayedDeliveries, setDelayedDeliveries] = useState(2); //sample data for now
  const [mealPreparationStatus, setMealPreparationStatus] = useState(5); // sample data for now

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 overflow-y-auto bg-gray-50 p-6 ml-20 md:ml-64">
        <h1 className="text-3xl text-center font-bold text-gray-900">Hospital Food Manager Dashboard</h1>

        <div className="mt-6 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FaBell className="h-6 w-6 text-red-500" />
            <span className="text-lg font-semibold text-gray-700">
              {delayedDeliveries} Delayed Deliveries
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaClipboardList className="h-6 w-6 text-yellow-500" />
            <span className="text-lg font-semibold text-gray-700">
              {mealPreparationStatus} Meals in Progress
            </span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Patient Details n Diet Charts */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Patients & Diet Charts</h2>
            <p className="mt-2 text-sm text-gray-600">View and manage patient details and diet plans.</p>
            <Link href="/patients/dashboard">
              <button className="mt-4 text-blue-600 hover:text-blue-800">View Details</button>
            </Link>
          </div>

          {/* Meal Delivery Status */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Track Meal Deliveries</h2>
            <p className="mt-2 text-sm text-gray-600">Monitor the status of food deliveries for all meals.</p>
            <Link href="/deliveries">
              <button className="mt-4 text-blue-600 hover:text-blue-800">Track Deliveries</button>
            </Link>
          </div>

          {/* Pantry Management */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Pantry Management</h2>
            <p className="mt-2 text-sm text-gray-600">Manage pantry staff, meal preparation tasks, and delivery assignments.</p>
            <Link href="/pantry">
              <button className="mt-4 text-blue-600 hover:text-blue-800">Manage Pantry</button>
            </Link>
          </div>

          {/* Alerts */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Alerts</h2>
            <p className="mt-2 text-sm text-gray-600">Monitor any issues or delays in meal preparation and delivery.</p>
            <Link href="/alerts">
              <button className="mt-4 text-blue-600 hover:text-blue-800">View Alerts</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
