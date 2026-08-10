import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState, AppDispatch } from "store/store";
import { fetchMathOverview } from "store/mathFactsSlice";

interface MathFactsListProps {
  classId: string | number;
  students: any[];
  onEdit: (student_id: number, student_name: string, assignments: any[]) => void;
}

const MAX_VISIBLE_BADGES = 2;

export default function MathFactsList({ classId, onEdit }: MathFactsListProps) {
  const { t } = useTranslation("teacher");
  const dispatch = useDispatch<AppDispatch>();

  const { overview, loading } = useSelector((state: RootState) => state.mathFacts);

  useEffect(() => {
    if (classId) {
      dispatch(fetchMathOverview(classId));
    }
  }, [classId, dispatch]);

  if (loading && overview.length === 0) {
    return <div className="p-16 text-center text-gray-400 font-medium animate-pulse">{t("syncingStudentRecords")}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">{t("studentFluencyOverview")}</h2>
        <div className="flex gap-2">
          <button onClick={() => onEdit(-1, t("multipleStudents"), [])} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm">
            {t("editForMultipleStudents")}
          </button>

          <button onClick={() => dispatch(fetchMathOverview(classId))} className="p-2 border rounded-lg hover:bg-gray-50 bg-white cursor-pointer">
             <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {overview.length === 0 ? (
            <div className="p-12 text-center text-gray-400 italic">{t("noStudentsFound")}</div>
        ) : (
            <div className="divide-y divide-gray-100">
            {overview.map((row) => {
              const assignments = row.active_assignments || [];
              const visible = assignments.slice(0, MAX_VISIBLE_BADGES);
              const remaining = assignments.length - visible.length;

              return (
                <div key={row.id} className="flex items-center gap-4 px-6 py-5 hover:bg-gray-50 transition-colors">
                  <div className="w-48 shrink-0">
                    <h3 className="font-bold text-gray-900 truncate">{row.full_name}</h3>
                    <p className="text-xs text-gray-400">@{row.username}</p>
                  </div>

                  <div className="flex-1 min-w-0 flex items-center gap-1.5 overflow-hidden whitespace-nowrap">
                    {assignments.length > 0 ? (
                      <>
                        {visible.map((asm: any) => (
                          <div
                            key={asm.id}
                            className="inline-flex shrink-0 items-center gap-1.5 px-3 py-1 rounded-full border border-blue-100 bg-blue-50/50"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${asm.is_mastered ? 'bg-green-500' : 'bg-blue-400 animate-pulse'}`}></span>
                            <span className="text-[10px] font-bold text-blue-700 uppercase truncate">
                              {asm.fact_set_name} {asm.is_mastered ? t("mastered") : ''}
                            </span>
                          </div>
                        ))}
                        {remaining > 0 && (
                          <span className="shrink-0 text-xs font-bold text-gray-400">
                            {t("moreCount", { count: remaining })}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100 shrink-0">
                        {t("mathLogicOff")}
                      </span>
                    )}
                  </div>

                  <div className="shrink-0">
                    <button
                      onClick={() => onEdit(row.id, row.full_name, row.active_assignments || [])}
                      className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-blue-600 border border-gray-200 px-4 py-2 rounded-lg bg-white shadow-sm hover:border-blue-200 transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
                      {t("edit")}
                    </button>
                  </div>
                </div>
              );
            })}
            </div>
        )}
      </div>
    </div>
  );
}