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

export function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}