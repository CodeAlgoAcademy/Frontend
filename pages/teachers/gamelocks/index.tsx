import TeacherLayout from '@/components/layouts/TeacherLayout';
import LockModal from '@/components/Teachers/gamelocks/modal';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "store/store";

export default function GameLocksPage() {
    const { students } = useSelector((state: RootState) => state.teacherStudentSlice);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);

    return (
        <TeacherLayout>
            <div className="p-8 bg-[#f8fafc] min-h-screen">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-800">Classroom Game Access</h1>
                    <p className="text-slate-500 text-sm">Control feature access and progress limits for your students.</p>
                </header>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {students.map((student) => {
                        const access = student.codingAccess;
                        const isLocked = access?.line_coding_locked || access?.block_coding_max_level;

                        return (
                            <div key={student.student_id} className="flex items-center justify-between p-5 border-b border-slate-50 hover:bg-slate-50/50 transition">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${isLocked ? 'bg-amber-100' : 'bg-green-100'}`}>
                                        {isLocked ? '🔒' : '🔓'}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-700">{student.firstName} {student.lastName}</p>
                                        <p className="text-xs text-slate-400">@{student.username}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 text-sm">
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Line Coding</span>
                                        <span className={access?.line_coding_locked ? "text-red-500 font-bold" : "text-green-600"}>
                                            {access?.line_coding_locked ? "Disabled" : "Active"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end border-l pl-8">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Block Progress</span>
                                        <span className="text-slate-600 font-medium">
                                            {access?.block_coding_max_level || "No Limit"}
                                        </span>
                                    </div>
                                    <button 
                                        onClick={() => { setSelectedStudent(student); setIsModalOpen(true); }}
                                        className="bg-white border px-4 py-2 rounded-lg font-bold text-blue-600 hover:bg-blue-50 transition shadow-sm"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {isModalOpen && (
                    <LockModal student={selectedStudent} onClose={() => setIsModalOpen(false)} />
                )}
            </div>
        </TeacherLayout>
    );
}