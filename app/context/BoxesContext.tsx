import { createContext, useContext, useState } from "react";
import { fakeBoxData } from "~/utils/data";
import type { IBox } from "~/utils/interfaces";

type BoxesContextType = {
  boxes: IBox[];
  addBox: (box: Omit<IBox, "id">) => void;
  updateBox: (id: string, updates: Partial<IBox>) => void;
  deleteBox: (id: string) => void;
};

const BoxesContext = createContext<BoxesContextType | null>(null);

export const useBoxes = () => {
  const ctx = useContext(BoxesContext);
  if (!ctx) throw new Error("useBoxes must be used within BoxesProvider");
  return ctx;
};

export function BoxesProvider({ children }: { children: React.ReactNode }) {
  const [boxes, setBoxes] = useState<IBox[]>(fakeBoxData);

  const addBox = (box: Omit<IBox, "id">) => {
    const newBox: IBox = {
      ...box,
      id: crypto.randomUUID(), // quick id
    };
    setBoxes(prev => [...prev, newBox]);
  };

  const updateBox = (id: string, updates: Partial<IBox>) => {
    setBoxes(prev =>
      prev.map(box => (box.id === id ? { ...box, ...updates } : box))
    );
  };

  const deleteBox = (id: string) => {
    setBoxes(prev => prev.filter(box => box.id !== id));
  };

  return (
    <BoxesContext.Provider value={{ boxes, addBox, updateBox, deleteBox }}>
      {children}
    </BoxesContext.Provider>
  );
}