// Laboratory box. Contains vials
export interface Box {
  id: string;
  userId: string;
  name: string;
  rows: number;
  columns: number;
  essential: boolean;
  numVials: number;
};

// Vial. Derives from a cell line
export interface Vial {
  id: string;
  userId: string;
  boxId: string;
  cellLineId: string;
  name: string;
  position: string;
};

// Cell line
export interface CellLine {
  id: string;
  userId: string;
  category: string;
  color: string;
  tags: string[];
}