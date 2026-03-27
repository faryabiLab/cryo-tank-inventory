export default function AddBoxModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-[#0f1624] p-6 rounded-lg w-[400px]">
      <h2 className="text-white mb-4">Add Box</h2>

      {/* form */}

      <button onClick={onClose}>Close</button>
    </div>
  );
}