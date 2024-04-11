import { createPortal } from "react-dom";

interface ModalProps {
  onClose: () => void;
  isGlobal: boolean;
  children: React.ReactNode;
}

export default function Modal({ onClose, isGlobal, children }: ModalProps) {
  const portal = document.getElementById("portal") as HTMLDivElement;
  if (portal === null) {
    return <div>포탈이 없습니다.</div>;
  }

  return isGlobal ? (
    createPortal(
      <>
        <div
          id="backdrop"
          className="z-50 w-full h-full mx-auto bg-black/[.20] fixed left-0 top-0 flex justify-center"
          onClick={onClose}
        >
          <div
            id="overlay"
            className="max-w-xl fixed top-12 w-36 h-40 bg-white rounded-lg flex flex-col"
          >
            <button onClick={onClose} className="flex justify-end p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            {children}
          </div>
        </div>
      </>,
      portal
    )
  ) : (
    <div
      id="overlay"
      className="absolute top-12 right-4 max-w-xl w-36 h-40 bg-white rounded-lg flex flex-col shadow"
    >
      <button onClick={onClose} className="flex justify-end p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      {children}
    </div>
  );
}
