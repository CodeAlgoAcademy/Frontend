import React from "react";

interface ModalContentProps {
  children: React.ReactNode;
}

export default function ModalContent({ children }: ModalContentProps) {
  return (
    <div
      className="bg-white w-full max-w-5xl max-h-[90vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}