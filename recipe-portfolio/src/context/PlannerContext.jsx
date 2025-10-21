
import { createContext, useContext, useState, useEffect } from 'react';

const PlannerContext = createContext();

export function usePlanner() {
  return useContext(PlannerContext);
}

const STORAGE_KEY = 'rp_plans_v1';

export default function PlannerContextProvider({ children }) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setPlans(raw ? JSON.parse(raw) : []);
    } catch (e) {
      setPlans([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
    } catch (e) {
      // ignore
    }
  }, [plans]);

  const addPlan = (plan) => {
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