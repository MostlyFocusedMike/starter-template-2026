import { type ReactNode } from "react";

type Props = {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  header: string;
  handleClose: () => void | undefined;
  handleSubmit: (_e: React.SubmitEvent) => void;
  hasX?: boolean;
  submitButtonText?: string;
  children: ReactNode;
}
export default function Modal({
  header,
  dialogRef,
  handleClose,
  handleSubmit,
  hasX = true,
  submitButtonText = 'Submit',
  children,
}: Props) {
  const closeModal = () => dialogRef?.current?.close();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (!e.currentTarget.matches('dialog')) return;
    const { top, bottom, left, right } = e.currentTarget.getBoundingClientRect();
    const { clientX: mouseX, clientY: mouseY } = e;

    if (mouseX === 0 && mouseY === 0) return;

    const clickedOutsideOfModalBox = (
      mouseX <= left || mouseX >= right ||
      mouseY <= top || mouseY >= bottom
    );
    if (clickedOutsideOfModalBox) closeModal();
  };

  return <>
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={handleClose}
      className="fixed inset-0 m-auto rounded-sm backdrop:backdrop-blur-[1px]"
    >
      <div className={`bg-gray-800 flex gap-20 justify-between items-center px-1`}>
        <h2 className="text-white text-3xl m-2">{header}</h2>
        {hasX &&
          <form method="dialog" className="block">
            <button aria-label="Close"
              className={`
                ml-4 mt-0.5 flex items-center justify-center w-8 h-8 rounded-lg text-white
                hover:text-white/70 hover:bg-white/5 transition-colors
              `}
            >X</button>
          </form>
        }
      </div>
      <form className="p-2" onSubmit={handleSubmit}>
        {children}
        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-3 py-1 rounded-full text-sm font-medium bg-gray-300 text-black hover:bg-gray-400 transition-colors active:scale-95"
          >
            Cancel
          </button>
          <button
            className="px-4 py-1 rounded-full text-sm font-medium bg-gray-800 hover:bg-gray-700 active:scale-95 text-white transition-all"
          >
            {submitButtonText}
          </button>
        </div>
      </form>
    </dialog >
  </>;
}
