'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

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
        const response = await axios.get('/api/meal-deliveries/delivery'); // Fetch ready meals
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Meal Delivery</h2>
      <ul>
        {mealDeliveries.map((meal) => (
          <li key={meal.id}>
            <p>
              {meal.patient.name} - {meal.mealPlan.mealType}
            </p>
            <button
              disabled={meal.status === 'IN_DELIVERY' || meal.status === 'DELIVERED'}
              onClick={() => handleDeliveryStatus(meal.id, 'IN_DELIVERY', '')}
              className='bg-black text-white p-2 rounded-lg m-4'>
              Start Delivery
            </button>
            <button
              disabled={meal.status === 'DELIVERED'}
              onClick={() => handleDeliveryStatus(meal.id, 'DELIVERED', 'Delivered on time')}
            className='bg-black text-white p-2 rounded-lg m-4'>
              Mark as Delivered
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealDelivery;
