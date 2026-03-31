import { createContext, useContext, useState } from "react";
import { fakeVialData } from "~/utils/data";
import type { IVial } from "~/utils/interfaces";

type VialsContextType = {
  vials: IVial[];
  addVial: (vial: Omit<IVial, "id">) => void;
  updateVial: (id: string, updates: Partial<IVial>) => void;
  deleteVial: (id: string) => void;
};

const VialsContext = createContext<VialsContextType | null>(null);

export const useVials = () => {
  const ctx = useContext(VialsContext);
  if (!ctx) throw new Error("useVials must be used within VialsProvider");
  return ctx;
};

export function VialsProvider({ children }: { children: React.ReactNode }) {
  const [vials, setVials] = useState<IVial[]>(fakeVialData);

  const addVial = (vial: Omit<IVial, "id">) => {
    const newVial: IVial = {
      ...vial,
      id: crypto.randomUUID(), // quick id
    };
    setVials(prev => [...prev, newVial]);
  };

  const updateVial = (id: string, updates: Partial<IVial>) => {
    setVials(prev =>
      prev.map(vial => (vial.id === id ? { ...vial, ...updates } : vial))
    );
  };

  const deleteVial = (id: string) => {
    setVials(prev => prev.filter(vial => vial.id !== id));
  };

  return (
    <VialsContext.Provider value={{ vials, addVial, updateVial, deleteVial }}>
      {children}
    </VialsContext.Provider>
  );
}