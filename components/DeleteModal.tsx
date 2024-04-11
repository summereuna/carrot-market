import Modal from "./Modal";

interface DeleteModalProps {
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({ onClose, onDelete }: DeleteModalProps) {
  return (
    <Modal isGlobal={true} onClose={onClose}>
      <div className="flex flex-col space-y-7 py-5 items-center">
        <div>
          <span className="cursor-default">정말로 삭제하시겠습니까?</span>
        </div>
        <div className="w-full flex justify-around">
          <div
            onClick={onClose}
            className="border cursor-pointer w-full p-3 flex justify-center hover:bg-slate-100 focus:bg-slate-100 transition-colors"
          >
            <span>취소</span>
          </div>

          <div
            onClick={onDelete}
            className="border-y cursor-pointer w-full p-3 flex justify-center hover:bg-red-100 focus:bg-red-100 transition-colors"
          >
            <span className="text-red-500">삭제하기</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
