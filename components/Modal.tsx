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

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return isGlobal ? (
    createPortal(
      <>
        <div
          id="backdrop"
          className="z-50 w-full h-full mx-auto bg-black/[.40] fixed left-0 top-0 right-0 bottom-0 flex justify-center items-center"
          onClick={onClose}
        >
          <div
            id="overlay"
            className="max-w-xl w-72 h-48 bg-white rounded-lg flex flex-col shadow-lg justify-between"
            onClick={handleOverlayClick}
          >
            <div className="flex justify-end pr-2 py-2">
              <button onClick={onClose} className="p-1">
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
            </div>
            {children}
          </div>
        </div>
      </>,
      portal
    )
  ) : (
    <div
      id="overlay"
      className="absolute top-12 right-4 max-w-xl w-36 h-40 bg-white rounded-lg flex flex-col shadow-lg"
      onClick={handleOverlayClick}
    >
      <div className="flex justify-end pr-2 py-2">
        <button onClick={onClose} className="p-1">
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
      </div>
      {children}
    </div>
  );
}
