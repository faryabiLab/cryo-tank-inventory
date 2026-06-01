import { useCellLines } from "~/context/CellLinesContext";
import { speciesTagColorMap, growthTagColorMap, diseaseTagColor, tissueTagColor } from "~/utils/data";
import { hexToRgba } from "~/utils/helpers";
import type { ICellLine } from "~/utils/interfaces";

// Single Cell Line Component
const CellItem: React.FC<{cell: ICellLine}> = ({cell}) => {
  return (
    <div className="flex flex-row bg-[#0f1624] border border-[#1e2d47] rounded-lg gap-2.5 px-4 py-2">
      <div className="aspect-square h-2.5 mt-1 rounded-xs" style={{backgroundColor: cell.color || 'white'}} />
      <div className="flex flex-col gap-1">
        <p className="text-[12px]">{cell.name}</p>
        <p className="text-[11px] text-[#8da0bb]">{cell.description}</p>
        {/* Tags */}
        <div className="flex flex-row flex-wrap gap-2">
          {/* Species Tag */}
          {cell.speciesTag && (
            <div
              className="text-[10px] w-fit px-1" 
              style={{
                backgroundColor: hexToRgba(speciesTagColorMap[cell.speciesTag] || '#fffff', 0.12),
                color: speciesTagColorMap[cell.speciesTag] || '#fffff'
              }}>
              {cell.speciesTag}
            </div>
          )}
          {/* Growth Tag */}
          {cell.growthTag && (
            <div
              className="text-[10px] w-fit px-1" 
              style={{
                backgroundColor: hexToRgba(growthTagColorMap[cell.growthTag] || '#fffff', 0.12),
                color: growthTagColorMap[cell.growthTag] || '#fffff'
              }}>
              {cell.growthTag}
            </div>
          )}
          {/* Disease Tag */}
          {cell.diseaseTag && (
            <div
              className="text-[10px] w-fit px-1" 
              style={{
                backgroundColor: hexToRgba(diseaseTagColor || '#fffff', 0.12),
                color: diseaseTagColor
              }}>
              {cell.diseaseTag}
            </div>
          )}
          {/* Tissue Tag */}
          {cell.tissueTag && (
            <div
              className="text-[10px] w-fit px-1" 
              style={{
                backgroundColor: hexToRgba(tissueTagColor || '#fffff', 0.12),
                color: tissueTagColor
              }}>
              {cell.tissueTag}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const ClassificationPage = () => {
  const { cellLines } = useCellLines();
  
  // Group Cell Lines by Category
  const categoryMap = cellLines.reduce((acc, cell) => {
    if (!acc[cell.category]) acc[cell.category] = [];
    acc[cell.category].push(cell);
    return acc;
  }, {} as Record<string, ICellLine[]>);

  return (
    <main className="flex items-center justify-center bg-[#080c14]">
      {/* Categories container */}
      <div className="flex flex-col gap-8 w-full p-6">
        {Object.entries(categoryMap).map(([category, cellLines]) => 
          <div key={category} className="flex flex-col">
            <div className="text-[11px] text-[#4a6080] uppercase border-b pb-1.5">
              {category}
            </div>
            {/* Cell Lines container */}
            <div className="grid gap-2 mt-4 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
              {cellLines.map((cell: ICellLine) => <CellItem key={cell.id} cell={cell} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default ClassificationPage;