import React, { createContext, useContext, useState, useEffect } from 'react';

const PlannerContext = createContext();

export function usePlanner() {
  return useContext(PlannerContext);
}

// NOTE: For real-world use, replace localStorage with Firebase/Firestore
const STORAGE_KEY = 'rp_plans_v1';

export default function PlannerContextProvider({ children }) {
  const [plans, setPlans] = useState([]);

  // Load plans from localStorage on mount
  useEffect(() => {
    try {
      // Line 45 (or near it) was where the crash occurred previously.
      const raw = localStorage.getItem(STORAGE_KEY);
      setPlans(raw ? JSON.parse(raw) : []);
    } catch (e) {
      // Error handling if localStorage is inaccessible
      console.error("Could not read plans from localStorage:", e);
      setPlans([]);
    }
  }, []);

  // Save plans to localStorage whenever 'plans' state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
    } catch (e) {
      console.warn("Could not save plans to localStorage:", e);
      // ignore
    }
  }, [plans]);

  const addPlan = (plan) => {
    // Accept plan objects with optional date/time fields (ISO strings). Keep backwards compatibility.
    setPlans((prevPlans) => [...prevPlans, plan]);
  };

  const updatePlan = (id, patch) => {
    setPlans((prev) => prev.map((p) => (String(p.id) === String(id) ? { ...p, ...patch } : p)));
  };

  const deletePlan = (id) => {
    setPlans((prev) => prev.filter((p) => String(p.id) !== String(id)));
  };

  return (
    <PlannerContext.Provider value={{ plans, addPlan, updatePlan, deletePlan }}>
      {children}
    </PlannerContext.Provider>
  );
}
