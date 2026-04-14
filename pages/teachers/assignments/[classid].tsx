import { AssignmentTitle } from "@/components/Teachers/blockAssignment/detailComponents/AssignmentTitle";
import { DetailHeader } from "@/components/Teachers/blockAssignment/detailComponents/DetailHeader";
import { LegendAndViewToggle } from "@/components/Teachers/blockAssignment/detailComponents/LegendAndViewToggle";
import { MetaInfo } from "@/components/Teachers/blockAssignment/detailComponents/MetaInfo";
import { ResultsTable } from "@/components/Teachers/blockAssignment/detailComponents/ResultsTable";
import { TopicPills } from "@/components/Teachers/blockAssignment/detailComponents/TopicPills";
import React, { useEffect, useState } from "react";
import assignmentServices from "services/block_assignments";

interface Props {
   classId: string | number;
   assignmentId: number;
   onBack: () => void;
   onEdit: () => void;
}

type ViewMode = "numeric" | "percentage";

const COLS_PER_PAGE = 5;

export default function AssignmentDetailView({ classId, assignmentId, onBack, onEdit }: Props) {
   const [data, setData] = useState<any>(null);
   const [loading, setLoading] = useState(true);
   const [colPage, setColPage] = useState(0);
   const [viewMode, setViewMode] = useState<ViewMode>("numeric");

   useEffect(() => {
      Promise.all([
         assignmentServices.getAssignmentResults(classId, assignmentId), 
         assignmentServices.getSinglAssignment(classId, assignmentId)
      ])
         .then(([results, detail]) => {
            const studentRecords = results.assignment?.student_records || [];
            const topicStats = results.topic_breakdown || [];
            const masterTopics = detail.topics || [];

            const mappedStudents = studentRecords.map((student: any) => {
               const rawScores = student.topic_scores || {};
               const scores: Record<string, { correct: number; total: number }> = {};

               Object.entries(rawScores).forEach(([key, value]: [string, any]) => {
                  scores[key] = {
                     correct: Number(value?.correct) || 0,
                     total: Number(value?.total) || 0,
                  };
               });

               return {
                  ...student,
                  topic_scores: scores,
               };
            });

            const mergedCols = masterTopics.map((topicItem: any) => {
               const stats = topicStats.find((t: any) => Number(t.topic_id) === Number(topicItem.id));
               return {
                  topic_id: topicItem.id,
                  topic_name: topicItem.name || topicItem.topic_name,
                  standard_code: topicItem.code || topicItem.standard_code,
                  total: stats ? stats.total : 0,
                  correct: stats ? stats.correct : 0,
               };
            });

            setData({
               title: results.assignment?.title || detail.title,
               created_at: results.assignment?.created_at || detail.created_at,
               question_count: results.assignment?.question_count || detail.question_count,
               status: detail.status,
               all_topics: mergedCols,
               student_records: mappedStudents,
            });
         })
         .catch(console.error)
         .finally(() => setLoading(false));
   }, [classId, assignmentId]);

   const handleEdit = () => {
      onEdit();
   };

   const handleArchive = async () => {
      try {
         await assignmentServices.archiveAssignment(classId, assignmentId);
         onBack();
      } catch (err) {
         console.error("Archive failed:", err);
         alert("Failed to archive assignment.");
      }
   };

   const handleDelete = async () => {
      if (window.confirm("Are you sure? This action is permanent.")) {
         try {
            await assignmentServices.deleteAssignment(classId, assignmentId);
            onBack();
         } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete assignment.");
         }
      }
   };

   if (loading) {
      return <div className="flex items-center justify-center py-20 text-slate-400">Loading results…</div>;
   }
   if (!data) {
      return <div className="flex items-center justify-center py-20 text-slate-400">Failed to load results.</div>;
   }

   const allCols = data.all_topics || [];
   const totalPages = Math.ceil(allCols.length / COLS_PER_PAGE);

   return (
      <div className="mx-auto max-w-[1200px] px-8 py-6">
         <DetailHeader onBack={onBack} onEdit={handleEdit} onArchive={handleArchive} onDelete={handleDelete} assignmentStatus={data.status} />
         <AssignmentTitle title={data.title} />
         <MetaInfo startDateRaw={data.created_at} questionCount={data.question_count} studentCount={data.student_records?.length || 0} />
         <TopicPills topics={allCols} />

         <LegendAndViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />

         <ResultsTable
            columns={allCols}
            students={data.student_records || []}
            viewMode={viewMode}
            currentPage={colPage}
            totalPages={totalPages}
            onPageChange={setColPage}
         />
      </div>
   );
}