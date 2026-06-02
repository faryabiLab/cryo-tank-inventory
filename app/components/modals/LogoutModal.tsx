import { useAuth } from "~/auth/AuthContext";

export default function LogoutModal({ onClose }: { onClose: () => void }) {
  const { logout } = useAuth();

  return (
    <div className="bg-[#0f1624] rounded-xl w-105 max-w-[95vw] border border-[#253552]">
      {/* Header */}
      <div className="flex flex-row justify-between items-center px-4 py-3 border-b border-[#1e2d47] rounded-t-md">
        <h3 className="text-[#dde5f0] text-[14px] font-semibold">Logout</h3>
      </div>
      {/* Text */}
      <div className="flex flex-col gap-4 p-4">
        <p className="text-[14px] text-[#dde5f0]">Are you sure you want to log out?</p>
      </div>
      {/* Buttons */}
      <div className="flex flex-row justify-end gap-4 px-4 pt-2 pb-4">
        <button
          className="bg-[#161f30] text-[#8da0bb] text-[13px] border border-[#1e2d47] rounded-md px-4 py-1.5
          hover:text-[#dde5f0] hover:border-[#253552] transition duration-150 cursor-pointer"
          onClick={onClose}
        >Cancel</button>
        <button
          className="bg-[#f871711a] text-[#f87171] text-[13px] border border-[#f871714d] rounded-md px-4 py-1.5
          hover:bg-[#f8717133] hover:border-[#f87171] transition duration-150 cursor-pointer"
          onClick={logout}
        >Logout</button>
      </div>
    </div>
  );
}
