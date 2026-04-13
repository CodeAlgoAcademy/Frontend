interface AssignmentTitleProps {
  title: string;
}

export function AssignmentTitle({ title }: AssignmentTitleProps) {
  return <h1 className="text-[32px] font-bold text-slate-900 mb-4">{title}</h1>;
}