import type { Box, Vial, CellLine } from "./interfaces";

export const boxData: Box[] = [
  {
    id: 'box_id_1',
    userId: 'user_id_1',
    name: 'Box 1',
    rows: 9,
    columns: 9,
    essential: true,
    numVials: 3,
  },
  {
    id: 'box_id_2',
    userId: 'user_id_1',
    name: 'Box 2',
    rows: 9,
    columns: 9,
    essential: true,
    numVials: 0,
  },
  {
    id: 'box_id_3',
    userId: 'user_id_1',
    name: 'Box 3',
    rows: 9,
    columns: 9,
    essential: false,
    numVials: 0,
  }
];

export const vialData: Vial[] = [
  {
    id: 'vial_id_1',
    userId: 'user_id_1',
    boxId: 'box_id_1',
    cellLineId: 'cell_id_1',
    name: 'Vial 1',
    position: 'A1',
  },
  {
    id: 'vial_id_2',
    userId: 'user_id_1',
    boxId: 'box_id_1',
    cellLineId: 'cell_id_2',
    name: 'Vial 2',
    position: 'A2',
  },
  {
    id: 'vial_id_3',
    userId: 'user_id_1',
    boxId: 'box_id_1',
    cellLineId: 'cell_id_3',
    name: 'Vial 3',
    position: 'A3',
  },
];

export const cellData: CellLine[] = [
  {
    id: 'cell_id_1',
    userId: 'user_id_1',
    category: 'Category 1',
    color: '#eb4034',
    tags: ['tag 1', 'tag 2', 'tag 3'],
  },
  {
    id: 'cell_id_2',
    userId: 'user_id_1',
    category: 'Category 1',
    color: '#2f72d6',
    tags: ['tag 2', 'tag 3'],
  },
  {
    id: 'cell_id_3',
    userId: 'user_id_1',
    category: 'Category 2',
    color: '#91d62f',
    tags: ['tag 3'],
  },
];