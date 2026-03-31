import { useModal } from "~/context/ModalContext";
import AddBoxModal from "./AddBoxModal";
import EditBoxModal from "./EditBoxModal";
import ArchiveBoxModal from "./ArchiveBoxModal";
// import DeleteBoxModal from "./DeleteBoxModal";

export default function ModalRoot() {
  const { modal, closeModal } = useModal();

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
      {/* {modal.type === "DELETE_BOX" && (
        <DeleteBoxModal data={modal.data} onClose={closeModal} />
      )} */}
    </div>
  );
}