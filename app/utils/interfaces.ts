// Laboratory box. Contains vials
export interface IBox {
  id: string;
  userId: string;
  name: string;
  rows: number;
  columns: number;
  essential: boolean;
  archived: boolean;
};

// Vial. Derives from a cell line
export interface IVial {
  id: string;
  userId: string;
  boxId: string;
  cellLineId: string;
  name: string;
  position: {row: number; col: number};
};

// Cell line
export interface ICellLine {
  id: string;
  userId: string;
  name: string;
  description: string;
  category: string;
  color: string;
  tags: string[];
};

export type GridCell = {
  vial?: IVial;
  cellLine?: ICellLine;
};

export type BoxGrid = GridCell[][];

export type VialsById = Record<string, IVial>;
export type CellLinesById = Record<string, ICellLine>;
export type VialsByBoxId = Record<string, string[]>; // array of vial IDs

export type Tab = "Inventory" | "Classification";