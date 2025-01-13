"use client";

// pages/dashboard/patient-diet.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
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
  const [showForm, setShowForm] = useState(false);
  const [newPatient, setNewPatient] = useState<Partial<Patient>>({
    id:"",
    name: "",
    age: 0,
    gender: "",
    roomNumber: "",
    contactInfo: "",
    dietCharts: [],
  });

  const [newDietChart, setNewDietChart] = useState<Partial<DietChart>>({
    id: "",
    startDate: "",
    endDate: null,
    mealPlans: [],
  });

  const [newMealPlan, setNewMealPlan] = useState<Partial<MealPlan>>({
    mealType: "",
    ingredients: [],
    instructions: [],
  });

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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDietChartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDietChart((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMealPlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMealPlan((prev) => ({
      ...prev,
      [name]: name === "ingredients" || name === "instructions" ? value.split(",") : value,
    }));
  };
  const addMealPlan = () => {
    setNewDietChart((prev) => {
      // Ensure default structure
      const updatedDietChart = {
        ...(prev || { id: "", startDate: "", endDate: null, mealPlans: [] }),
        mealPlans: [
          ...(prev?.mealPlans || []),
          { ...newMealPlan, id: `meal-${Date.now()}` },
        ],
      };
      
      return updatedDietChart;
    });
  
    setNewMealPlan({ mealType: "", ingredients: [], instructions: [] });
  };
  
  

  const addDietChart = () => {
    setNewPatient((prev) => {
      const updatedPatient = {
        ...prev,
        dietCharts: [
          ...(prev?.dietCharts || []),
          { ...newDietChart, id: `chart-${Date.now()}` },
        ],
      };
  
      return updatedPatient;
    });
  
    setNewDietChart({ startDate: "", endDate: null, mealPlans: [] });
  };
  
  const handleAddPatient = async () => {
    try {
      const patientToAdd = {
        name: newPatient.name,
        contactInfo: newPatient.contactInfo,
        age: newPatient.age,
        gender: newPatient.gender,
        roomNumber: newPatient.roomNumber,
        dietCharts: newPatient.dietCharts?.map((dietChart) => ({
          startDate: dietChart.startDate,
          endDate: dietChart.endDate,
          mealPlans: dietChart.mealPlans?.map((mealPlan) => ({
            mealType: mealPlan.mealType,
            ingredients: mealPlan.ingredients,
            instructions: mealPlan.instructions,
          })),
        })),
      };
  
      const response = await axios.post("/api/patients/add/route", patientToAdd);
      setPatients((prev) => [...prev, response.data.patient]);
      setShowForm(false);
  
      setNewPatient({
        name: "",
        age: 0,
        gender: "",
        roomNumber: "",
        contactInfo: "",
        dietCharts: [],
      });
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };
  

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6 ml-64">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Patient and Diet Charts</h1>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
            onClick={() => setShowForm(true)}
          >
            Add Patient
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center pt-20 bg-gray-800 bg-opacity-50 z-50 overflow-auto h-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
              <h2 className="text-xl font-bold mb-4">Add New Patient</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newPatient.name || ""}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                />
                <div className="flex gap-4">
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={newPatient.age || ""}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  value={newPatient.gender || ""}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                />
                </div>
                <input
                  type="text"
                  name="roomNumber"
                  placeholder="Room Number"
                  value={newPatient.roomNumber || ""}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="text"
                  name="contactInfo"
                  placeholder="Contact Info"
                  value={newPatient.contactInfo || ""}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                />
                <div className="mt-4">
                <h3 className="text-lg font-bold">Add Diet Chart</h3>

                  <div className="flex gap-4">
                  <input
                    type="date"
                    name="startDate"
                    placeholder="Start Date"
                    value={newDietChart.startDate || ""}
                    onChange={handleDietChartChange}
                    className="w-full p-2 border rounded-md mt-2"
                  />
                  <input
                    type="date"
                    name="endDate"
                    placeholder="End Date"
                    value={newDietChart.endDate || ""}
                    onChange={handleDietChartChange}
                    className="w-full p-2 border rounded-md mt-2"
                  />
                  </div>
                  <div className="mt-4">
                    <h4 className="font-bold">Add Meal Plan</h4>
                    <input
                      type="text"
                      name="mealType"
                      placeholder="Meal Type"
                      value={newMealPlan.mealType || ""}
                      onChange={handleMealPlanChange}
                      className="w-full p-2 border rounded-md mt-2"
                    />
                    <div className="flex gap-4">
                    <input
                      type="text"
                      name="ingredients"
                      placeholder="Ingredients (comma-separated)"
                      value={newMealPlan.ingredients?.join(", ") || ""}
                      onChange={handleMealPlanChange}
                      className="w-full p-2 border rounded-md mt-2"
                    />
                    <input
                      type="text"
                      name="instructions"
                      placeholder="Instructions (comma-separated)"
                      value={newMealPlan.instructions?.join(", ") || ""}
                      onChange={handleMealPlanChange}
                      className="w-full p-2 border rounded-md mt-2"
                    />
                    </div>
                    <button
                      onClick={addMealPlan}
                      className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Add Meal Plan
                    </button>
                  </div>
                  <button
                    onClick={addDietChart}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Diet Chart
                  </button>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={handleAddPatient}
                >
                  Add Patient
                </button>
              </div>
            </div>
          </div>
        )}

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
                  {patient.dietCharts.map((chart) => (
                    <div key={chart.id} className="mt-4">
                      <h3 className="text-lg font-bold">Diet Chart</h3>
                      <p className="text-sm text-gray-600">
                        Start Date: {chart.startDate} | End Date: {chart.endDate || "Ongoing"}
                      </p>
                      {chart.mealPlans.map((meal) => (
                        <div key={meal.id} className="mt-2">
                          <p className="font-semibold">{meal.mealType}</p>
                          <p className="text-sm">Ingredients: {meal.ingredients.join(", ")}</p>
                          <p className="text-sm">Instructions: {meal.instructions.join(", ")}</p>
                        </div>
                      ))}
                    </div>
                  ))}
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

