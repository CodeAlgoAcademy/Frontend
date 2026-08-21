import React from "react";
import { useTranslation } from "react-i18next";
import { formatTime, formatDate } from "./utils";

interface AnswerRowProps {
  ans: any;
}

export default function AnswerRow({ ans }: AnswerRowProps) {
  const { t } = useTranslation("teacher");

  const isLineCoding =
    ans.question_source === "activity" ||
    ans.question_source === "compiler";

  const selectedOption =
    ans.student_answer?.selected_option ??
    ans.student_answer?.order?.join(", ");

  return (
    <div
      className={`grid gap-x-4 px-6 py-5 items-start hover:bg-slate-50/60 transition-colors ${
        isLineCoding
          ? "grid-cols-[1fr_120px_150px_140px]"
          : "grid-cols-[1fr_120px_150px_140px]"
      }`}
    >
      {/* Question */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-blue-500 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                clipRule="evenodd"
              />
            </svg>

            <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer">
              {ans.topic_name}
            </span>
          </span>

          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-extrabold leading-tight">
            {ans.standard_code}
          </span>

          {isLineCoding && (
            <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-[10px] font-extrabold leading-tight">
              {ans.question_source === "compiler" ? "Python" : "Activity"}
            </span>
          )}
        </div>

        <div className="flex items-start gap-2">
          <span
            className={`mt-0.5 shrink-0 h-4 w-4 rounded-full flex items-center justify-center text-[9px] font-black shadow-sm ${
              ans.is_correct
                ? "bg-green-500 text-white"
                : "bg-red-400 text-white"
            }`}
          >
            {ans.is_correct ? "✔" : "✘"}
          </span>

          <p className="text-sm text-slate-700 leading-snug font-medium">
            {ans.question_text}
          </p>
        </div>
      </div>

      {isLineCoding ? (
        <div className="flex flex-col gap-2 pt-0.5 col-span-3">
          {ans.code && (
            <div className="bg-slate-900 rounded-lg p-3 text-xs">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Code
              </div>
              <pre className="text-green-400 font-mono whitespace-pre-wrap break-all leading-relaxed">
                {ans.code}
              </pre>
            </div>
          )}

          {(ans.output || ans.errors) && (
            <div className="flex gap-2">
              {ans.output && (
                <div className="flex-1 bg-slate-800 rounded-lg p-3 text-xs">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Output
                  </div>
                  <pre className="text-slate-200 font-mono whitespace-pre-wrap break-all">
                    {ans.output}
                  </pre>
                </div>
              )}

              {ans.errors && (
                <div className="flex-1 bg-red-950 rounded-lg p-3 text-xs">
                  <div className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-1">
                    Errors
                  </div>
                  <pre className="text-red-300 font-mono whitespace-pre-wrap break-all">
                    {ans.errors}
                  </pre>
                </div>
              )}
            </div>
          )}

          {ans.ai_rating != null && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">AI Rating:</span>
              <span
                className={`font-bold ${
                  ans.ai_rating >= 7
                    ? "text-green-600"
                    : ans.ai_rating >= 4
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {ans.ai_rating}/10
              </span>

              {ans.ai_summary && (
                <span className="text-slate-500">— {ans.ai_summary}</span>
              )}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Student Answer */}
          <div className="flex flex-col gap-1.5 pt-0.5">
            {selectedOption ? (
              <span
                className={`self-start px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                  ans.is_correct
                    ? "bg-green-500 text-white"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                {selectedOption}
              </span>
            ) : (
              <span className="text-xs text-slate-400 italic">
                {t("noAnswerRecorded")}
              </span>
            )}

            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">
              {ans.question_type?.replace(/_/g, " ")}
            </span>
          </div>

          {/* Answered At */}
          <div className="pt-0.5">
            {ans.answered_at ? (
              <>
                <div className="text-xs font-semibold text-slate-700 leading-tight">
                  {formatTime(ans.answered_at)}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {formatDate(ans.answered_at)}
                </div>
              </>
            ) : (
              <span className="text-xs text-slate-400">—</span>
            )}
          </div>

          {/* Duration */}
          <div className="pt-0.5">
            <span className="text-xs font-semibold text-slate-600">
              {ans.duration === 0 ? "—" : ans.duration}
            </span>
          </div>
        </>
      )}
    </div>
  );
}