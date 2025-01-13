"use client"

// pages/dashboard/patient-diet.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { FaUser, FaClipboardList } from "react-icons/fa";
import { Sidebar } from "@/components/ui/Sidebar";

interface MealPlan {
  id: string;
  mealType: string;
  ingredients: string[];
  instructions: string[];
}

interface DietChart {
  id: string;
  startDate: string;
  endDate: string | null;
  mealPlans: MealPlan[];
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  roomNumber: string;
  contactInfo: string;
  dietCharts: DietChart[];
}

const PatientDietDashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("/api/patients/route");
        setPatients(response.data.patients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="flex h-screen">

        <Sidebar/>
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6 ml-64">
        <h1 className="text-3xl font-bold text-gray-900">Patient and Diet Charts</h1>

        {loading ? (
            <div className="mt-6 text-lg text-gray-600">Loading...</div>
        ) : (
            <div className="mt-8 space-y-6">
            {patients.length === 0 ? (
                <div className="text-lg text-gray-600">No patients found.</div>
            ) : (
                patients.map((patient) => (
                <div
                    key={patient.id}
                    className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                >
                    <h2 className="text-xl font-semibold text-gray-800">
                    {patient.name} ({patient.age} years old)
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">Patient ID: {patient.id}</p>
                    <p className="mt-2 text-sm text-gray-600">Room: {patient.roomNumber}</p>
                    <p className="mt-2 text-sm text-gray-600">Gender: {patient.gender}</p>
                    <p className="mt-2 text-sm text-gray-600">Contact: {patient.contactInfo}</p>

                    <div className="mt-4 space-y-2">
                    <h3 className="font-semibold text-gray-800">Diet Charts</h3>
                    {patient.dietCharts.length > 0 ? (
                        <ul className="list-disc pl-6 space-y-1">
                        {patient.dietCharts.map((chart) => (
                            <li key={chart.id} className="text-sm text-gray-600">
                            <strong>{new Date(chart.startDate).toLocaleDateString()} - {chart.endDate ? new Date(chart.endDate).toLocaleDateString() : "Ongoing"}</strong>
                            <ul className="list-inside space-y-1">
                                {chart.mealPlans.map((meal) => (
                                <li key={meal.id} className="ml-4 text-gray-500">
                                    <strong>{meal.mealType}</strong> - Ingredients: {meal.ingredients.join(", ")}
                                    {meal.instructions.length > 0 && (
                                    <div className="text-xs text-gray-400">
                                        Instructions: {meal.instructions.join(", ")}
                                    </div>
                                    )}
                                </li>
                                ))}
                            </ul>
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-600">No diet chart available</p>
                    )}
                    </div>

                    <Link href={`/deliveries`}>
                    <button className="mt-4 text-blue-600 hover:text-blue-800">
                        View Patient Details
                    </button>
                    </Link>
                </div>
                ))
            )}
            </div>
        )}
        </div>
    </div>
  );
};

export default PatientDietDashboard;
