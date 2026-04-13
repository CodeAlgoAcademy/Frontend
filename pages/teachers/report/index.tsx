import React, { useEffect, useState } from 'react';
import TeacherLayout from '@/components/layouts/TeacherLayout';
import { useSelector } from 'react-redux';
import { RootState } from "store/store";
import { useAppDispatch } from "store/hooks";
import { fetchDiagnosticSummary } from 'store/teacherStudentSlice';
import DiagnosticDetailModal from '@/components/Teachers/report/modal';


const MASTERY_CONFIG: Record<string, {
    label: string; color: string; bg: string; border: string; dot: string; pct: number;
}> = {
    advanced:    { label: 'Advanced',    color: '#065f46', bg: '#ecfdf5', border: '#6ee7b7', dot: '#10b981', pct: 100 },
    proficient:  { label: 'Proficient',  color: '#1d4ed8', bg: '#eff6ff', border: '#93c5fd', dot: '#3b82f6', pct: 80  },
    secure:      { label: 'Secure',      color: '#5b21b6', bg: '#f5f3ff', border: '#c4b5fd', dot: '#8b5cf6', pct: 65  },
    developing:  { label: 'Developing',  color: '#92400e', bg: '#fffbeb', border: '#fcd34d', dot: '#f59e0b', pct: 45  },
    emerging:    { label: 'Emerging',    color: '#9a3412', bg: '#fff7ed', border: '#fdba74', dot: '#f97316', pct: 25  },
    remediation: { label: 'Remediation', color: '#991b1b', bg: '#fef2f2', border: '#fca5a5', dot: '#ef4444', pct: 10  },
};

const MASTERY_ORDER = ['advanced', 'proficient', 'secure', 'developing', 'emerging', 'remediation'];

const PERSISTENCE_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
    high:     { label: 'High',     color: '#065f46', bg: '#ecfdf5', border: '#6ee7b7' },
    medium:   { label: 'Medium',   color: '#92400e', bg: '#fffbeb', border: '#fcd34d' },
    emerging: { label: 'Emerging', color: '#9a3412', bg: '#fff7ed', border: '#fdba74' },
    low:      { label: 'Low',      color: '#991b1b', bg: '#fef2f2', border: '#fca5a5' },
};

const AVATAR_COLORS = ['#6366f1','#8b5cf6','#ec4899','#0ea5e9','#10b981','#f59e0b','#14b8a6','#f43f5e'];



function MasteryCell({ band }: { band: string }) {
    const key = band?.toLowerCase();
    const cfg = MASTERY_CONFIG[key];
    if (!cfg) return (
        <div className="flex flex-col gap-1.5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                <span className="w-2 h-2 rounded-full bg-slate-200 inline-block" />
                Not Assessed
            </span>
            <div className="h-1.5 w-28 rounded-full bg-slate-100" />
        </div>
    );
    return (
        <div className="flex flex-col gap-1.5">
            <span style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full w-fit">
                <span style={{ background: cfg.dot }} className="w-2 h-2 rounded-full flex-shrink-0" />
                {cfg.label}
            </span>
            <div className="flex items-center gap-2 w-28">
                <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div style={{ width: `${cfg.pct}%`, background: cfg.dot }}
                        className="h-full rounded-full transition-all duration-700" />
                </div>
                <span className="text-[10px] font-mono text-slate-400 w-7 text-right">{cfg.pct}%</span>
            </div>
        </div>
    );
}

function PersistencePill({ band }: { band: string }) {
    const cfg = PERSISTENCE_CONFIG[band?.toLowerCase()];
    if (!cfg || !band) return <span className="text-slate-300 font-medium">—</span>;
    return (
        <span style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
            className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wide">
            {cfg.label}
        </span>
    );
}

function StatCard({ value, label, accent }: { value: number | string; label: string; accent?: string }) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-center shadow-sm">
            <p className={`text-2xl font-black ${accent ?? 'text-slate-800'}`}>{value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">{label}</p>
        </div>
    );
}

export default function DiagnosticReportPage() {
    const dispatch = useAppDispatch();
    const { diagnosticSummary } = useSelector((state: RootState) => state.teacherStudentSlice);
    const { id: classId } = useSelector((state: RootState) => state.currentClass);
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

    useEffect(() => {
        if (classId) dispatch(fetchDiagnosticSummary(classId));
    }, [classId, dispatch]);

    const total = diagnosticSummary.length;
    const assessed = diagnosticSummary.filter(s => !!s.mastery_band).length;
    const pct = total > 0 ? Math.round((assessed / total) * 100) : 0;

    return (
        <TeacherLayout>
            <div className="min-h-screen bg-[#f0f4f8] p-4 sm:p-8">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-1">
                            Class Report
                        </p>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-800">
                            Diagnostic Class Results
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Visual Scripting &amp; Block Coding · Progress Analysis
                        </p>
                    </div>
                    <div className="flex gap-3 flex-shrink-0">
                        <StatCard value={total} label="Students" />
                        <StatCard value={assessed} label="Assessed" accent="text-indigo-600" />
                        <StatCard value={`${pct}%`} label="Completion" accent="text-emerald-600" />
                    </div>
                </div>

                <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 bg-white rounded-xl px-4 py-2.5 border border-slate-200 shadow-sm w-fit">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Mastery Scale
                    </span>
                    {MASTERY_ORDER.map(key => {
                        const cfg = MASTERY_CONFIG[key];
                        return (
                            <span key={key} className="flex items-center gap-1.5 text-[11px] font-semibold"
                                style={{ color: cfg.color }}>
                                <span style={{ background: cfg.dot }} className="w-2 h-2 rounded-full" />
                                {cfg.label}
                            </span>
                        );
                    })}
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[740px]">
                            <thead>
                                <tr className="bg-slate-50 border-b-2 border-slate-100">
                                    {['Student', 'Mastery Level', 'Persistence', 'Independence', 'Last Level', ''].map((h, i) => (
                                        <th key={i}
                                            className={`px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400
                                                ${i === 2 || i === 3 || i === 4 ? 'text-center' : ''}
                                                ${i === 3 ? 'hidden lg:table-cell' : ''}
                                                ${i === 5 ? 'text-right' : ''}`}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {diagnosticSummary.map((student, i) => (
                                    <tr key={student.student_id}
                                        className={`border-b border-slate-50 hover:bg-indigo-50/30 transition-colors
                                            ${i % 2 !== 0 ? 'bg-slate-50/40' : ''}`}>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <p className="font-bold text-mainColor text-sm leading-snug">
                                                        {student.student_name}
                                                    </p>
                                                    {student.flags.length > 0 ? (
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {student.flags.map(flag => (
                                                                <span key={flag}
                                                                    className="text-[9px] bg-indigo-50 text-indigo-500 px-1.5 py-0.5 rounded border border-indigo-100 uppercase font-bold tracking-wide">
                                                                    {flag.replace(/_/g, ' ')}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p className="text-[10px] text-slate-500 mt-0.5">
                                                            Diagnostic pending
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <MasteryCell band={student.mastery_band} />
                                        </td>

                                        <td className="px-5 py-4 text-center">
                                            <PersistencePill band={student.persistence_band} />
                                        </td>

                                        <td className="hidden lg:table-cell px-5 py-4 text-center">
                                            {student.independence_band ? (
                                                <span className="text-xs font-semibold text-slate-600 capitalize bg-slate-100 px-2.5 py-1 rounded-md">
                                                    {student.independence_band}
                                                </span>
                                            ) : (
                                                <span className="text-slate-300">—</span>
                                            )}
                                        </td>

                                        <td className="px-5 py-4 text-center">
                                            {student.last_completed_unit_level ? (
                                                <span className="inline-block bg-slate-800 text-white font-mono text-xs font-bold px-3 py-1.5 rounded-lg tracking-wider shadow-sm">
                                                    {student.last_completed_unit_level}
                                                </span>
                                            ) : (
                                                <span className="text-slate-300">—</span>
                                            )}
                                        </td>

                                        <td className="px-5 py-4 text-right">
                                            <button
                                                onClick={() => setSelectedStudentId(student.student_id)}
                                                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-white bg-white hover:bg-indigo-600 border border-indigo-200 hover:border-indigo-600 px-3 py-1.5 rounded-lg transition-all duration-150 shadow-sm">
                                                View Details
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {diagnosticSummary.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-center py-20 text-slate-400">
                                            <p className="text-3xl mb-2">📋</p>
                                            <p className="font-semibold">No students found in this class</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {total > 0 && (
                        <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between gap-4">
                            <p className="text-[11px] text-slate-400">
                                <span className="font-bold text-slate-600">{assessed}</span> of{' '}
                                <span className="font-bold text-slate-600">{total}</span> students assessed
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="w-36 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                                    <div style={{ width: `${pct}%` }}
                                        className="h-full rounded-full bg-indigo-500 transition-all duration-700" />
                                </div>
                                <span className="text-[11px] font-bold text-indigo-600">{pct}%</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {selectedStudentId && (
                <DiagnosticDetailModal
                    studentId={selectedStudentId}
                    onClose={() => setSelectedStudentId(null)}
                />
            )}
        </TeacherLayout>
    );
}