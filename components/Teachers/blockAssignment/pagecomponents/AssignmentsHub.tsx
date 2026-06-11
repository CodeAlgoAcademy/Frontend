import React from "react";

interface AssignmentsHubProps {
  onGoToCoding: () => void;
  onGoToMathFacts: () => void;
}

export default function AssignmentsHub({ onGoToCoding, onGoToMathFacts }: AssignmentsHubProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
        <p className="mt-1 text-sm text-gray-500">
          Choose how you'd like to assign work to your students.
        </p>
      </div>

      {/* Tool Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 max-w-3xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h2 className="text-base font-semibold text-gray-900">Coding Assignments</h2>
          </div>
          <p className="text-sm text-gray-500 mb-5">
            Create and manage custom coding missions. Track student progress through your curriculum.
          </p>
          <div className="flex flex-col gap-2 ">
            <button
              onClick={onGoToCoding}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              View Assignments
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            {/* Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-base font-semibold text-gray-900">Computational Math</h2>
          </div>
          <p className="text-sm text-gray-500 mb-5">
            Automated drills using variable-based logic (x + y) to build math fluency in your students.
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={onGoToMathFacts}
              className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
            >
              Manage Math Facts
            </button>
            <button
              onClick={onGoToMathFacts}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              View Mastery Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}