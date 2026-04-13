import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BlockStandardWithTopics, BlockTopic } from "types/interfaces/assignments";
import { RootState } from "store/store";
import assignmentServices from "services/block_assignments";
import { GRADES } from "../constant/constants";

interface SelectedTopic {
  id: number;
  name: string;
}

interface SkillPickerModalProps {
  classId: string | number;
  selectedTopics: SelectedTopic[];
  onConfirm: (topics: SelectedTopic[]) => void;
  onClose: () => void;
}

const SUBJECTS = [
  { label: "Math", value: "math" },
];


export default function SkillPickerModal({
  selectedTopics,
  onConfirm,
  onClose,
}: SkillPickerModalProps) {
  const [grade, setGrade] = useState("");
  const [search, setSearch] = useState("");
  const [standards, setStandards] = useState<BlockStandardWithTopics[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [subject, setSubject] = useState("math"); 
  const [localMap, setLocalMap] = useState<Map<number, string>>(
    () => new Map(selectedTopics.map((t) => [t.id, t.name]))
  );
  const classId = useSelector((state: RootState) => state.currentClass?.id);

  useEffect(() => {
    setLoading(true);
    assignmentServices
      .getSkillPicker(classId, grade || undefined)
      .then((data) => {
        setStandards(data);
        if (data.length) setExpanded(new Set([data[0].id]));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [classId, grade]);

  const filtered = standards.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      s.code.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.topics.some((t) => t.name.toLowerCase().includes(q))
    );
  });

  const toggleExpand = (id: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleTopic = (topic: BlockTopic) =>
    setLocalMap((prev) => {
      const next = new Map(prev);
      next.has(topic.id) ? next.delete(topic.id) : next.set(topic.id, topic.name);
      return next;
    });

  const toggleAll = (std: BlockStandardWithTopics) => {
    const allSel = std.topics.every((t) => localMap.has(t.id));
    setLocalMap((prev) => {
      const next = new Map(prev);
      if (allSel) {
        std.topics.forEach((t) => next.delete(t.id));
      } else {
        std.topics.forEach((t) => next.set(t.id, t.name));
      }
      return next;
    });
  };

  return (
    <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-[1000]" onClick={onClose}>
      <div className="bg-white rounded-2xl w-[min(840px,95vw)] max-h-[88vh] flex flex-col overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 m-0">Select Skill(s)</h2>
          <button className="bg-none border-none text-lg text-slate-400 cursor-pointer p-1 hover:text-slate-600 transition-colors" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-[180px] border-r border-slate-100 p-5 flex-shrink-0 overflow-y-auto">
            <div className="text-[11px] font-bold text-slate-400 uppercase mb-2">Subject</div>
            <select 
              className="w-full bg-slate-100 border-none rounded-lg px-2 py-2 text-[13px] font-semibold text-slate-700 outline-none cursor-pointer hover:bg-slate-200 transition-colors"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              {SUBJECTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select> 

            <div className="mt-5">
              <div className="text-[11px] font-bold text-slate-400 uppercase mb-2">Curriculum</div>
              <div className="bg-slate-100 rounded-lg px-3 py-1.5 text-[13px] font-semibold text-slate-700">Common Core</div>
            </div>
            
            <div className="mt-5">
              <div className="text-[11px] font-bold text-slate-400 uppercase mb-2">Grade</div>
              {GRADES.map((g) => (
                <button
                  key={g.value}
                  className={`block w-full bg-none border-none rounded-md px-2.5 py-1.5 text-[13px] text-left cursor-pointer mb-0.5 transition-colors ${
                    grade === g.value 
                      ? 'bg-blue-50 text-blue-600 font-semibold' 
                      : 'text-slate-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setGrade((p) => (p === g.value ? "" : g.value))}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100 bg-slate-50">
              <span>🔍</span>
              <input
                className="flex-1 border-none bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
                placeholder="Search for skills"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {loading ? (
              <div className="text-slate-400 text-center py-10">Loading skills…</div>
            ) : filtered.length === 0 ? (
              <div className="text-slate-400 text-center py-10">No skills found.</div>
            ) : (
              <div className="flex-1 overflow-y-auto p-3 px-4">
                {filtered.map((std) => {
                  const selCount = std.topics.filter((t) => localMap.has(t.id)).length;
                  const isOpen = expanded.has(std.id);
                  const allPicked = std.topics.length > 0 && selCount === std.topics.length;
                  return (
                    <div key={std.id} className="border border-slate-100 rounded-lg mb-2 overflow-hidden">
                      <div 
                        className="flex justify-between items-center p-3 px-4 cursor-pointer bg-gray-50 select-none hover:bg-gray-100 transition-colors"
                        onClick={() => toggleExpand(std.id)}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">🎯</span>
                          <div>
                            <span className="font-bold text-sm text-slate-900">{std.code}</span>{" "}
                            <span className="font-normal text-slate-600 text-[13px]">{std.name}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {selCount > 0 && (
                            <span className="bg-blue-50 text-blue-600 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                              {selCount} selected
                            </span>
                          )}
                          <span className="text-xs text-slate-400">{std.topic_count} skills</span>
                          <button
                            className={`bg-none border rounded-md px-2.5 py-0.5 text-[11px] cursor-pointer transition-colors ${
                              allPicked 
                                ? 'bg-blue-50 text-blue-600 border-blue-200' 
                                : 'border-slate-200 text-slate-600 hover:bg-gray-50'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleAll(std);
                            }}
                          >
                            {allPicked ? "Deselect all" : "Select all"}
                          </button>
                          <span className="text-[10px] text-slate-400">
                            {isOpen ? "▲" : "▼"}
                          </span>
                        </div>
                      </div>

                      {isOpen && (
                        <div className="py-2 px-4 pl-12 bg-white">
                          {std.topics.map((topic) => {
                            const checked = localMap.has(topic.id);
                            return (
                              <label key={topic.id} className="flex items-center py-2 border-b border-slate-50 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleTopic(topic)}
                                  className="accent-blue-600 w-4 h-4 cursor-pointer"
                                />
                                <span
                                  className={`ml-2.5 text-[13px] transition-colors ${
                                    checked ? 'text-blue-600 font-medium' : 'text-slate-700'
                                  }`}
                                >
                                  {topic.name}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between px-7 py-4 border-t border-slate-100">
          <span className="text-[13px] text-slate-500">
            {localMap.size} skill(s) selected
          </span>
          <button
            className={`bg-blue-600 text-white border-none rounded-lg px-7 py-2.5 font-bold text-sm cursor-pointer transition-all hover:bg-blue-700 active:scale-95 ${
              localMap.size === 0 ? 'opacity-45 cursor-not-allowed hover:bg-blue-600 active:scale-100' : ''
            }`}
            disabled={localMap.size === 0}
            onClick={() =>
              onConfirm(Array.from(localMap.entries()).map(([id, name]) => ({ id, name })))
            }
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}