import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { AssignmentListItem } from "types/interfaces/assignments";
import AssignmentCard from "../AssignmentCard";
import empty from "../../../../public/assets/teachers/emptystate.jpeg"

interface AssignmentsGridProps {
  assignments: AssignmentListItem[];
  loading: boolean;
  activeTab: string;
  onArchive: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number, title: string) => void;
  onCardClick: (id: number) => void;
}

export default function AssignmentsGrid({ 
  assignments, 
  loading, 
  activeTab,
  onArchive,
  onEdit,
  onDelete,
  onCardClick
}: AssignmentsGridProps) {
  const { t } = useTranslation("teacher");

  const emptyTabKeys: Record<string, string> = {
    active: "noActiveAssignments",
    completed: "noCompletedAssignments",
    archived: "noArchivedAssignments",
  };
  const emptyTabKey = emptyTabKeys[activeTab] || "noActiveAssignments";

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-gray-400">{t("loadingAssignments")}</div>
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-[20%] flex justify-center items-center mx-auto ">
        <Image src={empty} alt="" className="rounded-full" />   
        </div>
        <div className="text-black-400 text-sm pt-5">
          {t(emptyTabKey)}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assignments.map((assignment) => (
        <AssignmentCard 
          key={assignment.id} 
          assignment={assignment}
          onArchive={() => onArchive(assignment.id)}
          onEdit={() => onEdit(assignment.id)}
          onDelete={() => onDelete(assignment.id, assignment.title)} 
          onClick={() => onCardClick(assignment.id)} 
        />
      ))}
    </div>
  );
}