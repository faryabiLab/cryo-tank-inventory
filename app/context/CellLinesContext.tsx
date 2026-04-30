import { createContext, useContext, useState, useEffect } from "react";
import { cellLinesApi } from "~/api/cellLines";
import type { ICellLine } from "~/utils/interfaces";

type CellLinesContextType = {
  cellLines: ICellLine[];
  loading: boolean;
  error: string | null;
  addCellLine: (cellLine: Omit<ICellLine, "id">) => Promise<void>;
  updateCellLine: (id: string, updates: Partial<ICellLine>) => Promise<void>;
  deleteCellLine: (id: string) => Promise<void>;
};

const CellLinesContext = createContext<CellLinesContextType | null>(null);

export const useCellLines = () => {
  const ctx = useContext(CellLinesContext);
  if (!ctx) throw new Error("useCellLines must be used within CellLinesProvider");
  return ctx;
};

export function CellLinesProvider({ children }: { children: React.ReactNode }) {
  const [cellLines, setCellLines] = useState<ICellLine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cellLinesApi.getAll()
      .then(setCellLines)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const addCellLine = async (cellLine: Omit<ICellLine, "id">) => {
    const newCellLine = await cellLinesApi.create(cellLine);
    setCellLines(prev => [...prev, newCellLine]);
  };

  const updateCellLine = async (id: string, updates: Partial<ICellLine>) => {
    const updated = await cellLinesApi.update(id, updates);
    setCellLines(prev => prev.map(cl => cl.id === id ? updated : cl));
  };

  const deleteCellLine = async (id: string) => {
    await cellLinesApi.delete(id);
    setCellLines(prev => prev.filter(cl => cl.id !== id));
  };

  return (
    <CellLinesContext.Provider value={{ cellLines, loading, error, addCellLine, updateCellLine, deleteCellLine }}>
      {children}
    </CellLinesContext.Provider>
  );
}