import React from "react";

interface ModalBackdropProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalBackdrop({ onClose, children }: ModalBackdropProps) {
  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {children}
    </div>
  );
}