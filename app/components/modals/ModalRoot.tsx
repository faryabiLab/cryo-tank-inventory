import { useState } from "react";
import { useModal } from "~/context/ModalContext";
import AddBoxModal from "./AddBoxModal";
import EditBoxModal from "./EditBoxModal";
import ArchiveBoxModal from "./ArchiveBoxModal";
import DeleteBoxModal from "./DeleteBoxModal";
import AddVialModal from "./AddVialModal";
import EditVialModal from "./EditVialModal";
import LogoutModal from "./LogoutModal";

export default function ModalRoot() {
  const { modal, closeModal } = useModal();
  const [lastCellLineId, setLastCellLineId] = useState<string>("");

  if (!modal.type) return null;

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      {modal.type === "ADD_BOX" && (
        <AddBoxModal onClose={closeModal} />
      )}
      {modal.type === "EDIT_BOX" && (
        <EditBoxModal data={modal.data} onClose={closeModal} />
      )}
      {modal.type === "ARCHIVE_BOX" && (
        <ArchiveBoxModal data={modal.data} onClose={closeModal} />
      )}
      {modal.type === "DELETE_BOX" && (
        <DeleteBoxModal data={modal.data} onClose={closeModal} />
      )}
      {modal.type === "ADD_VIAL" && (
        <AddVialModal data={modal.data} lastCellLineId={lastCellLineId} setLastCellLineId={setLastCellLineId} onClose={closeModal} />
      )}
      {modal.type === "EDIT_VIAL" && (
        <EditVialModal data={modal.data} onClose={closeModal} />
      )}
      {modal.type === "LOGOUT" && (
        <LogoutModal onClose={closeModal} />
      )}
    </div>
  );
}