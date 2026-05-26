import React, { useState, useRef, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";

interface DetailHeaderProps {
  onBack: () => void;
  onEdit?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  assignmentStatus?: string;
}

export function DetailHeader({
  onBack,
  onEdit,
  onArchive,
  onDelete,
  assignmentStatus,
}: DetailHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const gearBtnRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowMenu(false);
    }, 150);
    setHoverTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  const handleMenuAction = (action: (() => void) | undefined, e: React.MouseEvent) => {
    e.stopPropagation();
    action?.();
    setShowMenu(false);
  };

  const isArchived = assignmentStatus === "archived";
  const menuItems = isArchived
    ? [
        { label: "Unarchive Assignment", action: onArchive, danger: false },
        { label: "Delete Permanently", action: onDelete, danger: true },
      ]
    : [
        { label: "Edit Assignment", action: onEdit, danger: false },
        { label: "Archive Assignment", action: onArchive, danger: false },
        { label: "Delete Permanently", action: onDelete, danger: true },
      ];

  return (
    <div className="flex justify-between items-center mb-3">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-slate-600 font-medium hover:text-slate-900 transition-colors bg-none border-none cursor-pointer"
      >
        ← Go Back
      </button>

      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          ref={gearBtnRef}
          className={`border border-slate-200 rounded-lg p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all duration-300 ${
            showMenu ? "rotate-45 shadow-sm" : "hover:rotate-45"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
        >
          <IoSettingsOutline className="text-lg" />
        </button>

        {showMenu && (
          <div
            ref={menuRef}
            className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg min-w-[200px] z-20 animate-slideDown origin-top-right"
          >
            <div className="py-1">
              {menuItems.map((item, idx) => (
                <button
                  key={idx}
                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors duration-200 ${
                    idx !== menuItems.length - 1 ? "border-b border-gray-100" : ""
                  } ${
                    item.danger
                      ? "text-red-600 hover:bg-red-50"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={(e) => handleMenuAction(item.action, e)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}