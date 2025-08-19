import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

export const Modal = ({ isOpen, setIsOpen, children, handleClose }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="relative z-10 focus:outline-none"
    >
      <div className="fixed inset-0 z-10 w-full overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-gray-400 flex gap-2 flex-col p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
