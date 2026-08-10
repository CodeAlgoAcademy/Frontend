import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { RootState } from "store/store";
import { ISingleStudent } from "types/interfaces";
import studentService from "services/studentService";
import { getStudents } from "store/studentSlice";

export type DestinationType = "" | "own" | "teacher";

export function useMoveStudents(onClose: () => void) {
   const { t } = useTranslation("teacher");
   const dispatch = useDispatch();
   const { id: sourceClassId } = useSelector((state: RootState) => state.currentClass);
   const students = useSelector((state: RootState) => state?.students?.students);
   const classes = useSelector((state: RootState) => state?.allClasses?.classes);

   const [step, setStep] = useState<number>(1);
   const [selectedIds, setSelectedIds] = useState<string[]>([]);
   const [destinationType, setDestinationType] = useState<DestinationType>("");
   const [targetClassId, setTargetClassId] = useState<string | number>("");
   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

   const [teachers, setTeachers] = useState<any[]>([]);
   const [teachersLoading, setTeachersLoading] = useState<boolean>(false);
   const [teacherQuery, setTeacherQuery] = useState<string>("");
   const [isTeacherDropdownOpen, setIsTeacherDropdownOpen] = useState<boolean>(false);
   const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
   const [teacherClasses, setTeacherClasses] = useState<any[]>([]);
   const [teacherClassesLoading, setTeacherClassesLoading] = useState<boolean>(false);
   const [newClassId, setNewClassId] = useState<string | number>("");

   const sourceClass = (Array.isArray(classes) ? classes : []).find((cls: any) => String(cls.id) === String(sourceClassId));
   const sourceClassName = sourceClass?.className;
   const sourceOrgId = sourceClass?.organization?.id;

   const targetClasses = Array.isArray(classes) ? classes.filter((cls: any) => String(cls.id) !== String(sourceClassId)) : [];

   const filteredTeachers = useMemo(() => {
      const query = teacherQuery.trim().toLowerCase();
      if (!query) return teachers;
      return teachers.filter((teacher: any) => {
         const name = `${teacher.firstName || ""} ${teacher.lastName || ""} ${teacher.username || ""} ${teacher.email || ""}`.toLowerCase();
         return name.includes(query);
      });
   }, [teachers, teacherQuery]);

   const fetchTeachers = async () => {
      if (!sourceOrgId) return;
      setTeachersLoading(true);
      try {
         const data = await studentService.getOrganizationTeachers(sourceOrgId);
         setTeachers(Array.isArray(data) ? data : []);
      } catch (error: any) {
         toast.error(error?.response?.data?.message || error?.message || t("failedToLoadTeachers"));
         setTeachers([]);
      } finally {
         setTeachersLoading(false);
      }
   };

   useEffect(() => {
      if (destinationType === "teacher" && teachers.length === 0 && !teachersLoading) {
         fetchTeachers();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [destinationType]);

   const fetchTeacherClasses = async (teacherId: string | number) => {
      setTeacherClassesLoading(true);
      try {
         const data = await studentService.getTeacherClasses(teacherId);
         setTeacherClasses(Array.isArray(data) ? data : []);
      } catch (error: any) {
         toast.error(error?.response?.data?.message || error?.message || t("failedToLoadTeachersClasses"));
         setTeacherClasses([]);
      } finally {
         setTeacherClassesLoading(false);
      }
   };

   const selectTeacher = (teacher: any) => {
      setSelectedTeacher(teacher);
      setTeacherQuery("");
      setIsTeacherDropdownOpen(false);
      setNewClassId("");
      setTeacherClasses([]);
      fetchTeacherClasses(teacher.id);
   };

   const toggleStudent = (id: string) => {
      setSelectedIds((prev) => (prev.includes(id) ? prev.filter((studentId) => studentId !== id) : [...prev, id]));
   };

   const toggleSelectAll = () => {
      if (selectedIds.length === students?.length) {
         setSelectedIds([]);
      } else {
         setSelectedIds((students || []).map((student: ISingleStudent) => student.id));
      }
   };

   const selectDestination = (type: "own" | "teacher") => {
      setDestinationType(type);
      setStep(3);
   };

   const goBack = () => {
      if (step === 4) {
         setStep(3);
      } else if (step === 3) {
         setDestinationType("");
         setStep(2);
      } else if (step === 2) {
         setStep(1);
      }
   };

   const handleMove = async () => {
      setIsSubmitting(true);
      try {
         if (destinationType === "own") {
            if (!targetClassId) return;
            await studentService.moveStudents({
               studentIds: selectedIds,
               sourceClassId: sourceClassId as string | number,
               targetClassId,
            });
         } else {
            if (!selectedTeacher || !newClassId) return;
            await studentService.transferStudentsOwner({
               studentIds: selectedIds,
               sourceClassId: sourceClassId as string | number,
               newTeacherId: selectedTeacher.id,
               newClassId,
            });
         }
         toast.success(t("studentsMovedSuccess", { count: selectedIds.length }));
         onClose();
         dispatch(getStudents());
      } catch (error: any) {
         toast.error(error?.response?.data?.message || error?.message || t("failedToMoveStudents"));
      } finally {
         setIsSubmitting(false);
      }
   };

   return {
      step, setStep,
      students, selectedIds, toggleStudent, toggleSelectAll,
      destinationType, selectDestination,
      sourceClassName, sourceOrgId,
      targetClasses, targetClassId, setTargetClassId,
      teachers: filteredTeachers, teachersLoading, teacherQuery, setTeacherQuery,
      isTeacherDropdownOpen, setIsTeacherDropdownOpen, selectedTeacher, selectTeacher,
      teacherClasses, teacherClassesLoading, newClassId, setNewClassId,
      isSubmitting, goBack, handleMove,
   };
}