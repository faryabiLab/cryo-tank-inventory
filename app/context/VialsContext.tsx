import { createContext, useContext, useState, useEffect } from "react";
import { vialsApi } from "~/api/vials";
import type { IVial } from "~/utils/interfaces";

type VialsContextType = {
  vials: IVial[];
  loading: boolean;
  error: string | null;
  addVial: (vial: Omit<IVial, "id" | "userId">) => Promise<void>;
  updateVial: (id: string, updates: Partial<IVial>) => Promise<void>;
  deleteVial: (id: string) => Promise<void>;
};

const VialsContext = createContext<VialsContextType | null>(null);

export const useVials = () => {
  const ctx = useContext(VialsContext);
  if (!ctx) throw new Error("useVials must be used within VialsProvider");
  return ctx;
};

export function VialsProvider({ children }: { children: React.ReactNode }) {
  const [vials, setVials] = useState<IVial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    vialsApi.getAll()
      .then(setVials)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const addVial = async (vial: Omit<IVial, "id" | "userId">) => {
    const newVial = await vialsApi.create(vial);
    setVials(prev => [...prev, newVial]);
  };

  const updateVial = async (id: string, updates: Partial<IVial>) => {
    const updated = await vialsApi.update(id, updates);
    setVials(prev => prev.map(vial => vial.id === id ? updated : vial));
  };

  const deleteVial = async (id: string) => {
    await vialsApi.delete(id);
    setVials(prev => prev.filter(vial => vial.id !== id));
  };

  return (
    <VialsContext.Provider value={{ vials, loading, error, addVial, updateVial, deleteVial }}>
      {children}
    </VialsContext.Provider>
  );
}