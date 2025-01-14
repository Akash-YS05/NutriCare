// pages/dashboard/patient-diet.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "@/components/ui/Sidebar";

interface MealPlan {
  id?: string;
  mealType: "MORNING" | "EVENING" | "NIGHT";
  ingredients: string[];
  instructions: string[];
}

interface DietChart {
  id?: string;
  startDate: string;
  endDate: string | null;
  mealPlans: MealPlan[];
}

interface Patient {
  id?: string;
  name: string;
  age: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  floorNumber: string;
  roomNumber: string;
  bedNumber: string;
  contactInfo: string;
  emergencyContact: string;
  diseases?: string[];
  allergies?: string[];
  dietCharts: DietChart[];
}

const PatientDietDashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [diseasesInput, setDiseasesInput] = useState("");
  const [allergiesInput, setAllergiesInput] = useState("");

  const [newPatient, setNewPatient] = useState<Partial<Patient>>({
    name: "",
    age: 0,
    gender: "MALE",
    floorNumber: "",
    roomNumber: "",
    bedNumber: "",
    contactInfo: "",
    emergencyContact: "",
    diseases: [],
    allergies: [],
    dietCharts: [],
  });

  const [newDietChart, setNewDietChart] = useState<Partial<DietChart>>({
    startDate: "",
    endDate: null,
    mealPlans: [],
  });

  const [newMealPlan, setNewMealPlan] = useState<Partial<MealPlan>>({
    mealType: "MORNING",
    ingredients: [],
    instructions: [],
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("/api/patients/route");
      setPatients(response.data.patients);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setError("Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleMealPlanChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMealPlan((prev) => ({
      ...prev,
      [name]: name === "ingredients" || name === "instructions" ? value.split(",") : value,
    }));
  };
  const handleDiseasesInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDiseasesInput(value);
    const diseasesList = value.split(",").map(d => d.trim()).filter(Boolean);
    setNewPatient(prev => ({ ...prev, diseases: diseasesList }));
  };
  
  const handleAllergiesInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAllergiesInput(value);
    const allergiesList = value.split(",").map(a => a.trim()).filter(Boolean);
    setNewPatient(prev => ({ ...prev, allergies: allergiesList }));
  };

  const addMealPlan = () => {
    setNewDietChart((prev) => ({
      ...prev,
      mealPlans: [
        ...(prev?.mealPlans || []),
        { ...newMealPlan as MealPlan, id: `meal-${Date.now()}` },
      ],
    }));

    setNewMealPlan({
      mealType: "MORNING",
      ingredients: [],
      instructions: [],
    });
  };

  const addDietChart = () => {
    setNewPatient((prev) => ({
      ...prev,
      dietCharts: [
        ...(prev?.dietCharts || []),
        { ...newDietChart as DietChart, id: `chart-${Date.now()}` },
      ],
    }));

    setNewDietChart({
      startDate: "",
      endDate: null,
      mealPlans: [],
    });
  };

  const handleAddPatient = async () => {
    try {
      setError(null);
      
      if (!newPatient.name || !newPatient.age || !newPatient.gender || 
          !newPatient.floorNumber || !newPatient.roomNumber || !newPatient.bedNumber ||
          !newPatient.contactInfo || !newPatient.emergencyContact) {
        throw new Error("Please fill in all required fields");
      }

      const response = await axios.post("/api/patients/add/route", newPatient);
      setPatients((prev) => [...prev, response.data.patient]);
      setShowForm(false);
      
      setNewPatient({
        name: "",
        age: 0,
        gender: "MALE",
        floorNumber: "",
        roomNumber: "",
        bedNumber: "",
        contactInfo: "",
        emergencyContact: "",
        diseases: [],
        allergies: [],
        dietCharts: [],
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Error adding patient");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6 ml-20 md:ml-64">
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
          <div className="fixed inset-0 flex items-start justify-center p-5 bg-gray-800 bg-opacity-50 z-50 overflow-auto h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
              <h2 className="text-xl font-bold mb-4">Add New Patient</h2>
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newPatient.name || ""}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={newPatient.age || ""}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                  <select
                    name="gender"
                    value={newPatient.gender}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="floorNumber"
                    placeholder="Floor Number"
                    value={newPatient.floorNumber || ""}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                  <input
                    type="text"
                    name="roomNumber"
                    placeholder="Room Number"
                    value={newPatient.roomNumber || ""}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                  <input
                    type="text"
                    name="bedNumber"
                    placeholder="Bed Number"
                    value={newPatient.bedNumber || ""}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="contactInfo"
                    placeholder="Contact Info"
                    value={newPatient.contactInfo || ""}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                  <input
                    type="text"
                    name="emergencyContact"
                    placeholder="Emergency Contact"
                    value={newPatient.emergencyContact || ""}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="diseases"
                  placeholder="Diseases (comma-separated)"
                  value={diseasesInput}
                  onChange={handleDiseasesInput}
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="text"
                  name="allergies"
                  placeholder="Allergies (comma-separated)"
                  value={allergiesInput}
                  onChange={handleAllergiesInput}
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
                    <select
                      name="mealType"
                      value={newMealPlan.mealType}
                      onChange={handleMealPlanChange}
                      className="w-full p-2 border rounded-md mt-2"
                    >
                      <option value="MORNING">Morning</option>
                      <option value="EVENING">Evening</option>
                      <option value="NIGHT">Night</option>
                    </select>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        name="ingredients"
                        placeholder="Ingredients (comma-separated)"
                        value={newMealPlan.ingredients?.join(",") || ""}
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
                  
                  {/* Display added meal plans */}
                  {newDietChart.mealPlans && newDietChart.mealPlans.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-bold">Added Meal Plans:</h4>
                      <div className="space-y-2">
                        {newDietChart.mealPlans.map((meal, index) => (
                          <div key={meal.id || index} className="p-2 bg-gray-50 rounded-md">
                            <p className="font-semibold">{meal.mealType}</p>
                            <p className="text-sm">Ingredients: {meal.ingredients.join(", ")}</p>
                            <p className="text-sm">Instructions: {meal.instructions.join(", ")}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={addDietChart}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Diet Chart
                  </button>
                </div>

                {/* Display added diet charts */}
                {newPatient.dietCharts && newPatient.dietCharts.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-bold">Added Diet Charts:</h4>
                    <div className="space-y-4">
                      {newPatient.dietCharts.map((chart, index) => (
                        <div key={chart.id || index} className="p-4 bg-gray-50 rounded-md">
                          <p className="font-semibold">
                            Date Range: {chart.startDate} - {chart.endDate || "Ongoing"}
                          </p>
                          <div className="mt-2">
                            {chart.mealPlans.map((meal, mealIndex) => (
                              <div key={meal.id || mealIndex} className="ml-4 mt-2">
                                <p className="font-medium">{meal.mealType}</p>
                                <p className="text-sm">Ingredients: {meal.ingredients.join(", ")}</p>
                                <p className="text-sm">Instructions: {meal.instructions.join(", ")}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {patient.name} ({patient.age} years old)
                      </h2>
                      <p className="mt-2 text-sm text-gray-600">Gender: {patient.gender}</p>
                      <p className="text-sm text-gray-600">
                        Location: Floor {patient.floorNumber}, Room {patient.roomNumber}, Bed {patient.bedNumber}
                      </p>
                      <p className="text-sm text-gray-600">Contact: {patient.contactInfo}</p>
                      <p className="text-sm text-gray-600">Emergency Contact: {patient.emergencyContact}</p>
                      {patient.diseases && patient.diseases.length > 0 && (
                        <p className="text-sm text-gray-600">Diseases: {patient.diseases.join(", ")}</p>
                      )}
                      {patient.allergies && patient.allergies.length > 0 && (
                        <p className="text-sm text-gray-600">Allergies: {patient.allergies.join(", ")}</p>
                      )}
                    </div>
                  </div>

                  {patient.dietCharts.map((chart) => (
                    <div key={chart.id} className="mt-4 border-t pt-4">
                      <h3 className="text-lg font-bold">Diet Chart</h3>
                      <p className="text-sm text-gray-600">
                        Start Date: {new Date(chart.startDate).toLocaleDateString()} | 
                        End Date: {chart.endDate ? new Date(chart.endDate).toLocaleDateString() : "Ongoing"}
                      </p>
                      <div className="mt-2 space-y-2">
                        {chart.mealPlans.map((meal) => (
                          <div key={meal.id} className="ml-4 p-2 bg-gray-50 rounded-md">
                            <p className="font-semibold">{meal.mealType}</p>
                            <p className="text-sm">Ingredients: {meal.ingredients.join(", ")}</p>
                            <p className="text-sm">Instructions: {meal.instructions.join(", ")}</p>
                          </div>
                        ))}
                      </div>
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