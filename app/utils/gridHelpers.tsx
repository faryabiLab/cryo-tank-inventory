import type { BoxGrid, IBox, ICellLine, IVial } from "./interfaces";

// grid = 9x9 spaces, some have vial
export function buildBoxGrid(
  box: IBox,
  vials: IVial[],
  cellLines: Record<string, ICellLine>,
): BoxGrid {
  // Initialize empty grid
  const grid: BoxGrid = Array.from({ length: box.rows }, () =>
    Array.from({ length: box.columns }, () => ({}))
  );

  // Place vials in their respective grid cell
  for (const vial of vials) {
    // Skip vials from other boxes
    if(vial.boxId !== box.id) continue;

    const { row, col } = vial.position;
    grid[col-1][row-1] = {
      vial,
      cellLine: cellLines[vial.cellLineId],
    };
  }

  return grid;
}