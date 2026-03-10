import React, { useState, useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';
import { updateCodingAccess, fetchCodingAccess } from 'store/teacherStudentSlice';

const BLOCK_LEVELS = [
    { code: "K_1", name: "Grade K: Basic Intro" },
    { code: "K_5", name: "Grade K: Systematic Steps" },
    { code: "K_8", name: "Grade K: Logical Order" },
    { code: "K_10", name: "Grade K: Counting 0-5" },
    { code: "1_1", name: "Grade 1: Place Value" },
    { code: "2_1", name: "Grade 2: Addition within 100" },
];

export default function LockModal({ student, onClose }: { student: any, onClose: () => void }) {
    const dispatch = useAppDispatch();
    const [lineLocked, setLineLocked] = useState(student?.codingAccess?.line_coding_locked || false);
    const [blockLevel, setBlockLevel] = useState(student?.codingAccess?.block_coding_max_level || "");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (student?.student_id) {
            dispatch(fetchCodingAccess(student.student_id));
        }
    }, [student?.student_id, dispatch]);

    const handleSave = async () => {
        setLoading(true);
        try {
            await dispatch(updateCodingAccess({ 
                studentId: student.student_id, 
                data: { 
                    line_coding_locked: lineLocked,
                    block_coding_max_level: blockLevel 
                } 
            })).unwrap();
            onClose();
        } catch (err) {
            console.error("Save failed", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in duration-200">
                <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                    <h2 className="text-lg font-bold text-slate-800">Edit Settings: {student?.firstName}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
                </div>

                <div className="p-8 space-y-8">
                    {/* Line Coding Feature Toggle */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div>
                            <h3 className="font-bold text-slate-800">Line Coding Mode</h3>
                            <p className="text-xs text-slate-500">Allow student to use the Python editor</p>
                        </div>
                        <button 
                            onClick={() => setLineLocked(!lineLocked)}
                            className={`w-14 h-8 rounded-full transition-all relative ${lineLocked ? 'bg-slate-300' : 'bg-green-500'}`}
                        >
                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${lineLocked ? 'left-1' : 'left-7'}`} />
                        </button>
                    </div>

                    {/* Block Coding Level Dropdown */}
                    <div className="space-y-4">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Block Game Progress Limit
                        </label>
                        <select 
                            value={blockLevel}
                            onChange={(e) => setBlockLevel(e.target.value)}
                            className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-blue-500 transition-all outline-none font-medium"
                        >
                            <option value="">No Limit (Full Access)</option>
                            {BLOCK_LEVELS.map((level) => (
                                <option key={level.code} value={level.code}>
                                    Stop at {level.name}
                                </option>
                            ))}
                        </select>
                        <p className="text-[10px] text-slate-400 italic">
                            Students will be padlocked from levels following your selection.
                        </p>
                    </div>
                </div>

                <div className="p-6 bg-slate-50 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-200 transition">Cancel</button>
                    <button 
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg disabled:opacity-50 transition-all"
                    >
                        {loading ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </div>
        </div>
    );
}