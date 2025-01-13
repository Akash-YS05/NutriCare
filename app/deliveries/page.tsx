'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidebar } from '@/components/ui/Sidebar';

type MealDelivery = {
  id: string;
  patient: { name: string };
  mealPlan: { mealType: string };
  status: string;
};

const MealDelivery = () => {
  const [mealDeliveries, setMealDeliveries] = useState<MealDelivery[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMealDeliveries = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/meal-deliveries/delivery');
        setMealDeliveries(response.data);
      } catch (error) {
        setError('Failed to fetch meal deliveries.');
        console.error('Error fetching meal deliveries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealDeliveries();
  }, []);

  const handleDeliveryStatus = async (deliveryId: string, status: string, notes: string) => {
    if (!deliveryId || !status) {
      alert('Delivery ID and status are required!');
      return;
    }

    try {
      const response = await axios.put('/api/meal-deliveries/delivery', { deliveryId, status, notes });
      setMealDeliveries((prevState) =>
        prevState.map((meal) =>
          meal.id === deliveryId ? { ...meal, status: response.data.status } : meal
        )
      );
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading meal deliveries...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex h-screen">
      <Sidebar/>
      <div className="container mx-auto p-6 ml-64">
        <h2 className="text-2xl font-bold text-center mb-6">Meal Delivery Dashboard</h2>

        {/* Summary Section */}
        <div className="flex justify-around mb-8 bg-gray-100 p-4 rounded-lg shadow-md">
          <div>
            <h3 className="text-lg font-semibold">Total Deliveries</h3>
            <p className="text-xl">{mealDeliveries.length}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">In Delivery</h3>
            <p className="text-xl">
              {mealDeliveries.filter((meal) => meal.status === 'IN_DELIVERY').length}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Delivered</h3>
            <p className="text-xl">
              {mealDeliveries.filter((meal) => meal.status === 'DELIVERED').length}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Pending</h3>
            <p className="text-xl">
              {mealDeliveries.filter((meal) => meal.status === 'PENDING').length}
            </p>
          </div>
        </div>

        {/* Delivery List */}
        <ul className="space-y-4">
          {mealDeliveries.map((meal) => (
            <li
              key={meal.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <div>
                <p className="text-lg font-semibold">
                  Patient: {meal.patient.name} - {meal.mealPlan.mealType} Meal
                </p>
                <p className="text-gray-600">Status: {meal.status}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  disabled={meal.status === 'IN_DELIVERY' || meal.status === 'DELIVERED'}
                  onClick={() => handleDeliveryStatus(meal.id, 'IN_DELIVERY', '')}
                  className={`p-2 rounded-lg ${
                    meal.status === 'IN_DELIVERY' || meal.status === 'DELIVERED'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}>
                  Start Delivery
                </button>
                <button
                  disabled={meal.status === 'DELIVERED'}
                  onClick={() => handleDeliveryStatus(meal.id, 'DELIVERED', 'Delivered on time')}
                  className={`p-2 rounded-lg ${
                    meal.status === 'DELIVERED'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}>
                  Mark as Delivered
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MealDelivery;
