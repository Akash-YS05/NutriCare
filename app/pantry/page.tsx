'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidebar } from '@/components/ui/Sidebar';

interface MealDelivery {
  id: string;
  status: string;
  scheduledFor: string;
  notes?: string;
}

interface MealPlan {
  id: string;
  mealType: string;
  ingredients: string[];
  instructions: string[];
  mealDeliveries: MealDelivery[];
}

interface DietChart {
  id: string;
  startDate: string;
  endDate?: string;
  mealPlans: MealPlan[];
}

interface Patient {
  id: string;
  name: string;
  contactInfo: string;
  floorNumber: string;
  roomNumber: string;
  bedNumber: string;
  emergencyContact: string;
  diseases: string[];
  allergies: string[];
  dietCharts: DietChart[];
}

export default function DeliveriesPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPatientsWithMealPlans();
  }, []);

  const fetchPatientsWithMealPlans = async () => {
    try {
      const response = await axios.get('/api/meal-deliveries/route');
      setPatients(response.data);
      setLoading(false);
    } catch (err) {
      setError(err+'Failed to fetch data');
      setLoading(false);
    }
  };

  const updateDeliveryStatus = async (deliveryId: string, status: string) => {
    try {
      const response = await axios.put('/api/meal-deliveries/route', { deliveryId, status });
      setPatients((prevPatients) =>
        prevPatients.map((patient) => ({
          ...patient,
          dietCharts: patient.dietCharts.map((dietChart) => ({
            ...dietChart,
            mealPlans: dietChart.mealPlans.map((mealPlan) => ({
              ...mealPlan,
              mealDeliveries: mealPlan.mealDeliveries.map((delivery) =>
                delivery.id === deliveryId ? response.data : delivery
              ),
            })),
          })),
        }))
      );
      alert("Status Updated.");
    } catch (err) {
      setError(err+'Failed to update delivery status');
    }
  };

  if (loading) return <div className="text-center text-xl font-semibold text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-xl font-semibold text-red-600">{error}</div>;

  return (
    <div className="flex h-screen">

      <Sidebar/>

      <div className="container mx-auto p-6 ml-20 md:ml-64">
        <h1 className="text-3xl font-bold mb-6">Pantry Dashboard</h1>
        <p>See assigned meal details, with tailored ingredients, instructions carefully set with details about allergies, if any. <br />Update the status of every meal in real time.</p>

        <hr />
        <br />

        {patients.map((patient) => (
          <div key={patient.id} className="bg-white p-6 mb-6 rounded-lg shadow-md hover:shadow-xl transition-all">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">{patient.name}</h2>
              <hr />
              <br />
              <p className="text-gray-600">&#8226; ID: {patient.id}</p>
              <p className="text-gray-600">&#8226; Contact Info: {patient.contactInfo}</p>
              <p className="text-gray-600">&#8226; Floor: {patient.floorNumber}, Room: {patient.roomNumber}, Bed: {patient.bedNumber}</p>
              <p className="text-gray-600">&#8226; Emergency Contact: {patient.emergencyContact}</p>
              <p className="text-gray-600">&#8226; Diseases: {patient.diseases.join(', ')}</p>
              <p className="text-gray-600">&#8226; Allergies: {patient.allergies.join(', ')}</p>
            </div>
            
            {patient.dietCharts.map((chart) => (
              <div key={chart.id} className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Diet Chart (Start: {new Date(chart.startDate).toLocaleDateString()})
                </h3>
                {chart.endDate && <p className="text-gray-600">End Date: {new Date(chart.endDate).toLocaleDateString()}</p>}
                {chart.mealPlans.map((plan) => (
                  <div key={plan.id} className="mt-4 p-4 border rounded-lg bg-gray-50 shadow-sm hover:bg-gray-100 transition-all">
                    <h4 className="text-lg font-semibold text-gray-800">{plan.mealType} Meal</h4>
                    <p className="text-gray-600">Ingredients: {plan.ingredients.join(', ')}</p>
                    <p className="text-gray-600">Instructions: {plan.instructions.join(', ')}</p>
                    
                    {plan.mealDeliveries.map((delivery) => (
                      <div key={delivery.id} className="mt-4 p-4 border-t border-gray-200">
                        <p className="font-semibold text-gray-700">Status: {delivery.status}</p>
                        <p className="text-gray-600">Scheduled For: {new Date(delivery.scheduledFor).toLocaleString()}</p>
                        {delivery.notes && <p className="text-gray-600">Notes: {delivery.notes}</p>}
                        <div className="mt-4">
                          <select
                            value={delivery.status}
                            onChange={(e) => updateDeliveryStatus(delivery.id, e.target.value)}
                            className="border p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            disabled={delivery.status === 'DELIVERED' || delivery.status === 'CANCELLED'}
                          >
                            <option value="PENDING">Pending</option>
                            <option value="PREPARING">Preparing</option>
                            <option value="READY">Ready</option>
                            <option value="IN_DELIVERY">In Delivery</option>
                            <option value="DELIVERED">Delivered</option>
                            <option value="CANCELLED">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
