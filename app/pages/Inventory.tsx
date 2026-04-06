import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { useBoxes } from "~/context/BoxesContext";
import { useModal } from "~/context/ModalContext";
import { useVials } from "~/context/VialsContext";
import { fakeCellData } from "~/utils/data";
import { buildBoxGrid, filterBoxesBySearch, getCoordinate } from "~/utils/helpers";
import type { BoxGrid, CellLinesById, GridCell, IBox, IVial } from "~/utils/interfaces";
// import searchIcon from "../assets/icons/search.svg";

type filterButton = "All" | "Essential" | "Has Cells" | "Archived";

type OutletContextType = {
  isEditMode: boolean;
}

// Single Cell Item. Can contain a vial
const CellItem: React.FC<{
  cell: GridCell,
  row: number,
  col: number,
  isEditMode: boolean,
  cellLineMap: CellLinesById,
  box: IBox,
}> = ({cell, row, col, isEditMode, cellLineMap, box}) => {
  const { openModal } = useModal();

  // Add vial on empty space or Edit existing vial
  const handleCellSelect = (vial: IVial | undefined, row: number, col: number) => {
    const data = {
      id: vial?.id || "",
      name: vial?.name || "",
      cellLineId: vial?.cellLineId || "",
      cellLineMap: cellLineMap, 
      boxId: box.id,
      boxName: box.name,
      userId: box.userId,
      row: row,
      col: col,
    }
    openModal(vial ? "EDIT_VIAL" : "ADD_VIAL", data);
  };

  return (
    <div className="relative group">
      {/* Cell */}
      <div
        className={`aspect-square rounded-sm border m-px border-[#0f1929] transition
        ${cell.cellLine && 'hover:scale-110 cursor-pointer'} duration-150
        ${(!cell.cellLine && isEditMode) && 'border-dashed border-[#1a3050] hover:border-[#34d499] cursor-pointer'}`}
        style={{
          backgroundColor: cell.cellLine?.color ?? "#0b1220",
        }}
        onClick={() => isEditMode && handleCellSelect(cell.vial, row, col)}
      />
      {/* Tooltip */}
      {(cell.cellLine && cell.vial) && (
        <div className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-1
          hidden group-hover:block
          whitespace-nowrap px-2 py-1 text-xs rounded bg-black text-white shadow-lg">
            <p className="text-center">{getCoordinate(row, col)}:</p>
            <p className="text-center max-w-64 truncate">{cell.cellLine.name}</p>
            <p className="text-center max-w-64 truncate">{cell.vial.name}</p>
        </div>
      )}
    </div>
  )
};

// Single Box Component
const BoxItem: React.FC<{
  box: IBox, 
  allVials: IVial[],
  cellLineMap: CellLinesById, 
  isEditMode: boolean
}> = ({box, allVials, cellLineMap, isEditMode}) => {
  const { openModal } = useModal();
  const { updateBox } = useBoxes();
  const [boxGrid, setBoxGrid] = useState<BoxGrid | null>(null);

  useEffect(() => {
    setBoxGrid(buildBoxGrid(box, boxVials, cellLineMap));
  }, [box, allVials]);

  const totalCells = box.rows * box.columns;
  const boxVials = allVials.filter((v: IVial) => v.boxId === box.id);
  const fillPercentage: number = Math.ceil((boxVials.length * 100) / totalCells);

  const handleMoreOptions = () => {
    openModal("EDIT_BOX", box);
  }

  const handleRestoreBox = () => {
    updateBox(box.id, {
      archived: false,
    });
  }

  const handleDeleteBox = () => {
    if(box.archived) {
      openModal("DELETE_BOX", box);
    } else {
      openModal("ARCHIVE_BOX", box);
    }
  }

  // TODO: Optimize, don't update on every letter change, but after losing focus
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateBox(box.id, {
      name: event.target.value,
    });
  };

  return (
    <div className={`bg-[#0f1624] border ${box.essential ? "border-[#f59e0b40] hover:border-[#f59e0b73]" :
    "border-[#253552]"} rounded-lg transition duration-150`}>
      {/* Header */}
      <div className="flex flex-row gap-2 items-center bg-[#161f30] px-3 py-2 border-b border-[#1e2d47] rounded-t-md">
        <div className={`${box.essential ? 'bg-[#f59e0b1f] text-[#f59e0b]' : 'bg-[#38bdf81a] text-[#38bdf8]'}
        text-[10px] flex justify-center items-center px-1.5 py-0.5 rounded-md`}>
          {box.essential ? "Essential" : 'Box'}
        </div>
        {/* Box Name (Editable) */}
        {isEditMode ? (
          <input
            type="text"
            className="text-[11px] text-[#8da0bb] w-full border not-focus:border-dashed border-[#38bdf84d] rounded-sm px-1.5 py-0.5
              focus:text-[#dde5f0] focus:border focus:border-[#38bdf8] transition duration-300 focus:outline-none"
            value={box.name}
            onChange={handleNameChange}
          />
        ) : (
          <p className="w-full text-[12px] text-[#dde5f0]">📝 {box.name}</p>
        )}
        <p className="text-[11px] text-[#4a6080] ml-auto">{boxVials.length}/{totalCells}</p>
      </div>
      {/* Filled bar */}
      <div className="flex flex-col p-2">
        <div className="flex flex-row justify-between text-[10px]">
          <p className="text-[#4a6080]">{fillPercentage}% filled</p>
          <p className="text-[#38bdf8]">{boxVials.length} vials</p>
        </div>
        <div className="mt-0.5 h-0.5 rounded-xs bg-[#1c2840]">
          <div 
            className="h-full w-full" 
            style={{
              backgroundImage: 'linear-gradient(90deg, rgb(124, 58, 237), rgb(56, 189, 248))',
              width: `${fillPercentage}%`
            }} 
          />
        </div>
      </div>
      {/* Box grid */}
      <div className="p-2">
        {/* Column headers */}
        <div className="grid grid-cols-9 h-full w-full">
          {Array.from({length: box.columns},(_,index) =>
            <p key={`header-${index}-${box.id}`} className="text-[8px] text-[#4a6080] text-center">{index+1}</p>
          )}
        </div>
        {/* Vials container */}
        <div className="grid grid-cols-9 h-full w-full">
          {boxGrid && boxGrid.map((row, i) => (
            <div key={i}>
              {row.map((cell, j) => (
                <CellItem 
                  key={`${box.id}-${j}-${i}`}
                  cell={cell}
                  row={j+1}
                  col={i+1}
                  isEditMode={isEditMode}
                  cellLineMap={cellLineMap}
                  box={box}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Edit buttons */}
      {isEditMode && (
        <div className="flex flex-row flex-wrap gap-1.5 px-3 py-2 border-t border-[#1e2d47]">
          {/* Restore / Edit button */}
          <button
            className="text-[11px] text-[#8da0bb] border border-[#1e2d47] px-2 py-1 rounded-sm
              hover:text-[#38bdf8] hover:border-[#38bdf8] transition duration-300 cursor-pointer"
            onClick={box.archived ? handleRestoreBox : handleMoreOptions }
          >{box.archived ? "🔄 Restore box" : "✏️ More options"}</button>
          {/* Delete / Archive button */}
          <button
            className="text-[11px] text-[#8da0bb] border border-[#1e2d47] px-2 py-1 rounded-sm
              hover:text-[#f87171] hover:border-[#f87171] transition duration-300 cursor-pointer"
            onClick={handleDeleteBox}
          >🗑 {box.archived ? "Delete" : "Archive"} box</button>
        </div>
      )}
    </div>
  )
}

const ControlMenu: React.FC<{
  allBoxes: IBox[],
  allVials: IVial[],
  activeButton: filterButton,
  searchValue: string,
  setFilteredBoxes: (boxes: IBox[]) => void,
  setActiveButton: (active: filterButton) => void,
  setSearchValue: (search: string) => void,
}> = ({allBoxes, allVials, activeButton, searchValue, setFilteredBoxes, setActiveButton, setSearchValue}) => {

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // Update boxes displayed upon filter change
  useEffect(() => {
    let filtered: IBox[] = allBoxes;

    // Box filters
    if(activeButton === "All"){
      filtered = filtered.filter((box: IBox) => box.archived === false);
    } else if(activeButton === "Essential"){
      filtered = filtered.filter((box: IBox) => box.essential === true && box.archived === false);
    } else if(activeButton === "Has Cells") {
      filtered = filtered.filter((box: IBox) => allVials.some(vial => vial.boxId === box.id && box.archived === false));
    } else if(activeButton === "Archived") {
      filtered = filtered.filter((box: IBox) => box.archived === true);
    }

    // Cell line search filter
    setFilteredBoxes(filterBoxesBySearch(filtered, allVials, fakeCellData, searchValue))
  },[activeButton, searchValue, allBoxes]);

  return (
    <div className="flex flex-row items-center flex-wrap gap-4 bg-[#0f1624b3] border-b border-[#1e2d47] py-3 px-6">
      {/* Search bar */}
      {/* <img src="/icons/search.svg" alt="search-icon" className="w-6 h-6"/> */}
      <input
        type="search"
        className="bg-[#161f30] text-[12px] w-64 h-8 rounded-md border border-[#1e2d47] px-4"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Search cell line"
      />
      {/* Box filter buttons */}
      <button
        className={`text-[12px] border px-3 py-1.5 rounded-md cursor-pointer transition duration-150
          ${activeButton === "All" ? "bg-[#38bdf8] border-[#38bdf8] text-[#080c14] font-semibold"
          : "bg-[#0f1624] text-[#8da0bb] border-[#1e2d47] hover:border-[#38bdf8] hover:text-[#38bdf8]"}`}
        onClick={() => setActiveButton("All")}
      >All</button>
      <button
        className={`text-[12px] border px-3 py-1.5 rounded-md cursor-pointer transition duration-150
          ${activeButton === "Essential" ? "bg-[#f59e0b] border-[#f59e0b] text-[#080c14] font-semibold"
          : "bg-[#0f1624] text-[#8da0bb] border-[#1e2d47] hover:border-[#38bdf8] hover:text-[#38bdf8]"}`}
        onClick={() => setActiveButton("Essential")}
      >⭐ Essential</button>
      <button
        className={`text-[12px] border px-3 py-1.5 rounded-md cursor-pointer transition duration-150
          ${activeButton === "Has Cells" ? "bg-[#38bdf8] border-[#38bdf8] text-[#080c14] font-semibold"
          : "bg-[#0f1624] text-[#8da0bb] border-[#1e2d47] hover:border-[#38bdf8] hover:text-[#38bdf8]"}`}
        onClick={() => setActiveButton("Has Cells")}
      >Has Cells</button>
      <button
        className={`text-[12px] border px-3 py-1.5 rounded-md cursor-pointer transition duration-150
          ${activeButton === "Archived" ? "bg-[#38bdf8] border-[#38bdf8] text-[#080c14] font-semibold"
          : "bg-[#0f1624] text-[#8da0bb] border-[#1e2d47] hover:border-[#38bdf8] hover:text-[#38bdf8]"}`}
        onClick={() => setActiveButton("Archived")}
      >🗑 Archived</button>
    </div>
  );
}

const ColorKey: React.FC<{cellLineMap: CellLinesById}> = ({cellLineMap}) => {
  return (
    <div className="flex flex-row items-center flex-wrap gap-3 border-b border-[#1e2d47] py-2 px-6">
      <p className="text-[10px] text-[#4a6080] uppercase">Color Key:</p>
      {Object.entries(cellLineMap).map(([id, cell]) =>
        <div key={`color-map-${id}`} className="flex flex-row items-center gap-1">
          <div className="aspect-square h-2 rounded-xs" style={{backgroundColor: cell.color || 'white'}} />
          <p className="text-[10px] text-[#8da0bb]">{cell.name}</p>
        </div>
      )}
    </div>
  );
}

const BoxCount: React.FC<{
  allBoxes: IBox[],
  filteredBoxes: IBox[],
  searchValue: string,
  activeButton: filterButton
}> = ({allBoxes, filteredBoxes, searchValue, activeButton}) => {
  return (
    <div className="flex flex-row items-center flex-wrap gap-3 border-b border-[#1e2d47] py-2 px-6">
      {activeButton !== "Archived" ? (
        <p className="text-[11px] text-[#4a6080]">
          Showing{' '}
          <span className="text-[#38bdf8]">{filteredBoxes.length}</span>{' '}
          of{' '}
          <span className="text-[#38bdf8]">{allBoxes.length}</span>{' '}
          boxes{' '}
          {searchValue && (
            <span>
              · "<span className="text-[#38bdf8]">{searchValue}</span>"
            </span>
          )}
        </p>
      ) : (
        <p className="text-[11px] text-[#4a6080]">
          Showing{' '}
          <span className="text-[#38bdf8]">{filteredBoxes.length}</span>{' '}
          archived boxes
        </p>
      )}
    </div>
  );
}

export default function InventoryPage() {
  const { isEditMode } = useOutletContext<OutletContextType>();
  const { openModal } = useModal();
  const { boxes } = useBoxes();
  const { vials } = useVials();

  const [filteredBoxes, setFilteredBoxes] = useState<IBox[]>([]);
  const [activeButton, setActiveButton] = useState<filterButton>("All");
  const [searchValue, setSearchValue] = useState<string>("");

  const handleCreateBox = () => {
    openModal("ADD_BOX");
  };

  // Map of Cell Lines by ID
  const cellLineMap: CellLinesById = Object.fromEntries(
    fakeCellData.map((cell) => [cell.id, cell])
  );

  const showAddBoxButton = isEditMode && !searchValue && activeButton !== "Archived";

  return (
    <main className="flex flex-col bg-[#080c14]">
      {/* Menus */}
      <ControlMenu
        allBoxes={boxes}
        allVials={vials}
        activeButton={activeButton}
        searchValue={searchValue}
        setFilteredBoxes={setFilteredBoxes}
        setActiveButton={setActiveButton}
        setSearchValue={setSearchValue}
      />
      <ColorKey cellLineMap={cellLineMap} />
      <BoxCount
        allBoxes={boxes.filter((box: IBox) => box.archived === false)}
        filteredBoxes={filteredBoxes}
        searchValue={searchValue}
        activeButton={activeButton}
      />
      {/* Boxes */}
      <div className="grid gap-4 mt-4 grid-cols-[repeat(auto-fill,minmax(310px,1fr))] w-full p-6">
        {filteredBoxes.map((box: IBox) => 
          <BoxItem 
            key={box.id}
            box={box}
            allVials={vials}
            cellLineMap={cellLineMap}
            isEditMode={isEditMode}
          />
        )}
        {/* Create Box Button */}
        {showAddBoxButton && (
          <button
            className="flex flex-col justify-center bg-[#0f1624] text-[#4a6080] text-[13px] gap-2 p-4
            border-2 border-dashed border-[#1e2d47] rounded-lg cursor-pointer
            hover:border-[#34d499] hover:text-[#34d499] transition duration-300"
            onClick={handleCreateBox}
          >
            <span className="text-2xl">+</span>
            <span>Add new box</span>
          </button>
        )}
      </div>
    </main>
  );
}