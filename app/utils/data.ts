import type { IBox, IVial, ICellLine } from "./interfaces";

export const boxData: IBox[] = [
  {
    id: 'box_id_1',
    userId: 'user_id_1',
    name: 'Box 1',
    rows: 9,
    columns: 9,
    essential: true,
  },
  {
    id: 'box_id_2',
    userId: 'user_id_1',
    name: 'Box 2',
    rows: 9,
    columns: 9,
    essential: true,
  },
  {
    id: 'box_id_3',
    userId: 'user_id_1',
    name: 'Box 3',
    rows: 9,
    columns: 9,
    essential: false,
  }
];

export const vialData: IVial[] = [
  {
    id: 'vial_id_1',
    userId: 'user_id_1',
    boxId: 'box_id_1',
    cellLineId: 'cell_id_1',
    name: 'Vial 1',
    position: {row: 1, col: 1},
  },
  {
    id: 'vial_id_2',
    userId: 'user_id_1',
    boxId: 'box_id_1',
    cellLineId: 'cell_id_2',
    name: 'Vial 2',
    position: {row: 1, col: 2},
  },
  {
    id: 'vial_id_3',
    userId: 'user_id_1',
    boxId: 'box_id_2',
    cellLineId: 'cell_id_3',
    name: 'Vial 3',
    position: {row: 3, col: 1},
  },
];

export const cellData: ICellLine[] = [
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