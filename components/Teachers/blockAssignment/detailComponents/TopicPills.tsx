interface TopicPillsProps {
  topics: Array<{ topic_id: number; topic_name: string }>;
}

export function TopicPills({ topics }: TopicPillsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {topics.map((topic) => (
        <span
          key={topic.topic_id}
          className="bg-blue-50 text-black text-xs font-medium px-3 py-1.5 rounded-full border border-blue-100"
        >
          {topic.topic_name}
        </span>
      ))}
    </div>
  );
}