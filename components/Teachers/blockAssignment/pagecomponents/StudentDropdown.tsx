import React, { useState, useMemo, useRef, useEffect } from "react";
import studentService from "services/studentService";

interface Student {
  id: number;
  name: string;
  username: string;
}

interface StudentDropdownProps {
  classId: string | number;          
  selectedStudentId: number | null;
  onSelectStudent: (id: number | null) => void;
}

function useClickOutside<T extends HTMLElement>(handler: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handler]);
  return ref;
}

export default function StudentDropdown({ 
  classId,
  selectedStudentId, 
  onSelectStudent 
}: StudentDropdownProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setShowDropdown(false));

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const data = await studentService.getStudents(String(classId));
        const mapped = data.map((s: any) => ({
          id: s.id,
          name: `${s.firstName} ${s.lastName}`.trim(),
          username: s.username,
        }));
        setStudents(mapped);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      } finally {
        setLoading(false);
      }
    };
    if (classId) fetchStudents();
  }, [classId]);

  const selectedStudent = students.find(s => s.id === selectedStudentId);
  
  const filteredStudents = useMemo(() => {
    return students.filter(student => 
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.username.toLowerCase().includes(search.toLowerCase())
    );
  }, [students, search]);

  const handleSelect = (id: number | null) => {
    onSelectStudent(id);
    setShowDropdown(false);
    setSearch("");
  };

  if (loading) {
    return (
      <div className="inline-flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg min-w-[180px]">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        className="inline-flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:border-blue-400 transition-colors min-w-[180px]"
      >
        <span>{selectedStudent ? selectedStudent.name : "All Students"}</span>
        <svg className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {showDropdown && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-3 border-b border-gray-100">
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none transition-colors"
              autoFocus
            />
          </div>
          <div className="max-h-80 overflow-y-auto">
            <div 
              onClick={() => handleSelect(null)}
              className={`px-3 py-2.5 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition-colors ${!selectedStudentId ? 'bg-blue-50' : ''}`}
            >
              <span className="text-sm font-medium">All Students</span>
              {!selectedStudentId && <span className="text-blue-600">✓</span>}
            </div>
            {filteredStudents.length === 0 ? (
              <div className="px-3 py-8 text-center text-sm text-gray-400">No students found</div>
            ) : (
              filteredStudents.map((student) => (
                <div
                  key={student.id}
                  onClick={() => handleSelect(student.id)}
                  className={`px-3 py-2.5 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition-colors ${selectedStudentId === student.id ? 'bg-blue-50' : ''}`}
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{student.username}</div>
                  </div>
                  {selectedStudentId === student.id && <span className="text-blue-600">✓</span>}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}