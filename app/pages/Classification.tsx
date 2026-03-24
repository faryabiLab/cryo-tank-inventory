import { cellData, tagColorMap } from "~/utils/data";
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
        <div className="flex flex-row flex-wrap gap-2">
          {cell?.tags.map((tag: string) => 
            <div 
              className="text-[10px] w-fit px-1" 
              style={{
                backgroundColor: hexToRgba(tagColorMap[tag] || '#fffff', 0.12),
                color: tagColorMap[tag]
              }}>
              {tag}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const ClassificationPage = () => {

  // Group Cell Lines by Category
  const categoryMap = cellData.reduce((acc, cell) => {
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