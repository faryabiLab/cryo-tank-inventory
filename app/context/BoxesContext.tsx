import { createContext, useContext, useState, useEffect } from "react";
import { boxesApi } from "~/api/boxes";
import type { IBox } from "~/utils/interfaces";

type BoxesContextType = {
  boxes: IBox[];
  loading: boolean;
  error: string | null;
  addBox: (box: Omit<IBox, "id">) => Promise<void>;
  updateBox: (id: string, updates: Partial<IBox>) => Promise<void>;
  deleteBox: (id: string) => Promise<void>;
};

const BoxesContext = createContext<BoxesContextType | null>(null);

export const useBoxes = () => {
  const ctx = useContext(BoxesContext);
  if (!ctx) throw new Error("useBoxes must be used within BoxesProvider");
  return ctx;
};

export function BoxesProvider({ children }: { children: React.ReactNode }) {
  const [boxes, setBoxes] = useState<IBox[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all boxes on mount
  useEffect(() => {
    boxesApi.getAll()
      .then(setBoxes)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const addBox = async (box: Omit<IBox, "id">) => {
    const newBox = await boxesApi.create(box);
    setBoxes(prev => [...prev, newBox]);
  };

  const updateBox = async (id: string, updates: Partial<IBox>) => {
    const updated = await boxesApi.update(id, updates);
    setBoxes(prev => prev.map(box => box.id === id ? updated : box));
  };

  const deleteBox = async (id: string) => {
    await boxesApi.delete(id);
    setBoxes(prev => prev.filter(box => box.id !== id));
  };

  return (
    <BoxesContext.Provider value={{ boxes, loading, error, addBox, updateBox, deleteBox }}>
      {children}
    </BoxesContext.Provider>
  );
}