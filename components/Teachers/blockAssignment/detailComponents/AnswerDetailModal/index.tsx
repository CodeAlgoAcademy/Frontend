import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchStudentTopicAnswers } from "store/blockAssignmentSlice";
import { useAppDispatch } from "store/hooks";
import { RootState } from "store/store";
import ModalBackdrop from "./ModalBackdrop";
import ModalContent from "./ModalContent";
import ModalHeader from "./ModalHeader";
import StudentInfo from "./StudentInfo";
import AnswerTableHeader from "./AnswerTableHeader";
import AnswerList from "./AnswerList";
import { computeStats } from "./utils";

interface AnswerDetailModalProps {
  classId: string;
  recordId: string;
  topicId: string;
  topicName?: string;
  standardCode?: string;
  onClose: () => void;
}

export default function AnswerDetailModal({
  classId,
  recordId,
  topicId,
  topicName,
  standardCode,
  onClose,
}: AnswerDetailModalProps) {
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.assignments.detailedAnswers);
  const loading = useSelector((state: RootState) => state.assignments.loading);

  useEffect(() => {
    if (classId && recordId) {
      dispatch(fetchStudentTopicAnswers({ classId, recordId, topicId }));
    }
  }, [dispatch, classId, recordId, topicId]);

  const { correctCount, totalCount, pct, perfColor } = computeStats(data?.answers ?? []);

  return (
    <ModalBackdrop onClose={onClose}>
      <ModalContent>
        <ModalHeader assignmentTitle={data?.assignment_title} onClose={onClose} />
        <StudentInfo
          username={data?.student_username}
          correctCount={correctCount}
          totalCount={totalCount}
          pct={pct}
          perfColor={perfColor}
        />
        <AnswerTableHeader />
        <AnswerList answers={data?.answers} loading={loading} />
      </ModalContent>
    </ModalBackdrop>
  );
}