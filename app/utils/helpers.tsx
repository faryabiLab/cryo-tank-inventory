import type { BoxGrid, IBox, ICellLine, IVial } from "./interfaces";

/**
 * Builds grid with vials for a specific box. Facilitates rendering
 * @param {IBox} box - Box for grid
 * @param {IVial[]} vials - Array of vials
 * @param {Record<string, ICellLine>} cellLines - Map of Cell Line ids to objects
 * @returns {BoxGrid} 2-dimensional array with vials in respective positions
 */
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

/**
 * Converts a Hex color value to RGBA
 * @param {string} hex - Color value (e.g. #FFFFFF)
 * @param {string} alpha - Opacity for resulting color (e.g. 0.1)
 * @returns {string} rgba string (e.g. rgba(255, 255, 255, 0.5))
 */
export function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}