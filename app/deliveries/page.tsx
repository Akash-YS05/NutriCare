'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sidebar } from '@/components/ui/Sidebar';
import { Button } from '@/components/ui/Button';

interface MealDelivery {
  id: string;
  patient: { name: string; floorNumber: string; roomNumber: string };
  mealPlan: { mealType: string };
  preparedBy: { user: { name: string } } | null;
  deliveredBy: { user: { name: string } } | null;
  status: string;
  scheduledFor: string;
  notes: string | null;
}

export default function PantryDashboard() {
  const [meals, setMeals] = useState<MealDelivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/pantry/route');
      setMeals(response.data);
    } catch (err) {
      setError(err+'Failed to fetch meals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex h-screen">
        <Sidebar/>
        <div className="container mx-auto p-6 ml-20 md:ml-64">
        <h1 className="text-2xl font-bold mb-6">Meal Plans and Deliveries</h1>
        <p>Have a real time look on patient meal details, the delivery status and be updated about all changes from the pantry staff.</p>
        <hr />
        <br />

        <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
            <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Patient</th>
                <th className="border border-gray-300 px-4 py-2">Meal Type</th>
                <th className="border border-gray-300 px-4 py-2">Prepared By</th>
                <th className="border border-gray-300 px-4 py-2">Delivered By</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Scheduled For</th>
                {/* <th className="border border-gray-300 px-4 py-2">Actions</th> */}
            </tr>
            </thead>
            <tbody>
            {meals.map((meal) => (
                <tr key={meal.id}>
                <td className="border border-gray-300 px-4 py-4">
                    {meal.patient.name} (Room: {meal.patient.roomNumber})
                </td>
                <td className="border border-gray-300 px-4 py-2">{meal.mealPlan.mealType}</td>
                <td className="border border-gray-300 px-4 py-2">
                    {meal.preparedBy?.user.name || 'Not Assigned'}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                    {meal.deliveredBy?.user.name || 'Not Assigned'}
                </td>
                <td className="border border-gray-300 px-4 py-2">{meal.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                    {new Date(meal.scheduledFor).toLocaleString()}
                </td>
                {/* <td className="border border-gray-300 px-4 py-2">
                    <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => alert(`Updating meal: ${meal.id}`)}
                    >
                    Update Status
                    </button>
                </td> */}
                </tr>
            ))}
            </tbody>
        </table>
        <Button size='lg' className='my-4'><a href="/pantry">Check Pantry Status</a></Button>
        </div>
    </div>
  );
}
