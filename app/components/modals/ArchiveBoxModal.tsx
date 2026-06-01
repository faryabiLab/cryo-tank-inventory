import { useBoxes } from "~/context/BoxesContext";

export default function ArchiveBoxModal({ data, onClose }: { data?: any; onClose: () => void }) {
  const { updateBox } = useBoxes();

  const handleArchive = () => {
    updateBox(data.id, {
      archived: true,
    })

    onClose();
  };

  return (
    <div className="bg-[#0f1624] rounded-xl w-105 max-w-[95vw] border border-[#253552]">
      {/* Header */}
      <div className="flex flex-row justify-between items-center px-4 py-3 border-b border-[#1e2d47] rounded-t-md">
        <h3 className="text-[#dde5f0] text-[14px] font-semibold">Archive box: {data.name}?</h3>
        <button
          className="text-[#4a6080] text-[18px] mr-2 cursor-pointer hover:text-[#dde5f0] transition duration-150"
          onClick={onClose}
        >x</button>
      </div>
      {/* Body */}
      <div className="flex flex-col gap-4 p-4 border-b border-[#1e2d47]">
        <p className="text-[14px] text-[#8da0bb]">
          Archive{' '}
          <strong className="text-[#dde5f0]">{data.name}</strong>{' '}
          and all its vials?
        </p>
      </div>
      {/* Buttons */}
      <div className="flex flex-row justify-end gap-2 p-4">
        <button
          className="bg-[#161f30] text-[#8da0bb] text-[13px] border border-[#1e2d47] rounded-md px-4 py-1.5
          hover:text-[#dde5f0] hover:border-[#253552] transition duration-150 cursor-pointer"
          onClick={onClose}
        >Cancel</button>
        <button
          className="bg-[#f871711a] text-[#f87171] text-[13px] border border-[#f871714d] font-medium rounded-md px-4 py-1.5
         hover:bg-[#f8717133] hover:border-[#f87171] transition duration-150 cursor-pointer"
          onClick={handleArchive}
        >Archive</button>
      </div>
    </div>
  );
}