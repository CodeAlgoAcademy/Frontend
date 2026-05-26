import React from "react";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";
import AnswerRow from "./AnswerRow";

interface AnswerListProps {
  answers?: any[];
  loading: boolean;
}

export default function AnswerList({ answers, loading }: AnswerListProps) {
  if (loading) return <LoadingState />;
  if (!answers?.length) return <EmptyState />;

  return (
    <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
      {answers.map((ans, idx) => (
        <AnswerRow key={ans.id ?? idx} ans={ans} />
      ))}
    </div>
  );
}