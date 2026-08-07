import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { days, screentimeTypes } from "types/interfaces";
import { RootState } from "store/store";
import { bulkUpdateClassScreenTime } from "store/teachersClassSlice";
import TeacherScreenTimeComponent from "../UI/screenTimeComponent";
import { getStudents } from "store/studentSlice";
import { toast } from "sonner";
import {  setClassBaseTimeLimit } from "utils/useMultiForm";
import { changeTimeLimit } from "utils/timelimit";

const ClassScreenTimeBulk = () => {
  const { t } = useTranslation("teacher");
  const classId = useSelector((state: RootState) => state.currentClass?.id);
  const students = useSelector((state: RootState) => state.students?.students);
  const dispatch = useDispatch();
  const [timeLimits, setTimeLimits] = useState<screentimeTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const defaultTimeLimits: screentimeTypes[] = [
    { id: 1, dayOfTheWeek: "Monday", timeLimit: "No Limit" },
    { id: 2, dayOfTheWeek: "Tuesday", timeLimit: "No Limit" },
    { id: 3, dayOfTheWeek: "Wednesday", timeLimit: "No Limit" },
    { id: 4, dayOfTheWeek: "Thursday", timeLimit: "No Limit" },
    { id: 5, dayOfTheWeek: "Friday", timeLimit: "No Limit" },
    { id: 6, dayOfTheWeek: "Saturday", timeLimit: "No Limit" },
    { id: 7, dayOfTheWeek: "Sunday", timeLimit: "No Limit" },
  ];

useEffect(() => {
  if (!students?.length) {
    setTimeLimits(defaultTimeLimits);
    return;
  }
  const firstStudent = students[0];
  const transformed = firstStudent?.timeLimits?.length
    ? changeTimeLimit(firstStudent.timeLimits)
    : [];

  const complete = defaultTimeLimits.map(d =>
    transformed.find(t => t.dayOfTheWeek === d.dayOfTheWeek) || d
  );

  setTimeLimits(complete);
}, [students]);

useEffect(() => {
  if (classId) dispatch(getStudents(classId));
}, [classId, dispatch]);

const updateTime = async (
  _id: string | number | undefined,
  day: days,
  hour: number | "No Limit"
) => {
  if (!classId) return toast.error(t("noClassSelected"));

  setIsLoading(true);
  const data = {
    dayOfTheWeek: day,
    timeLimit: setClassBaseTimeLimit(hour),
  };

  try {
    await dispatch(bulkUpdateClassScreenTime({ class_id: classId, data }) as any);
    setTimeLimits(prev =>
      prev.map(t =>
        t.dayOfTheWeek === day ? { ...t, timeLimit: hour } : t
      )
    );
    await dispatch(getStudents(classId) as any);
    toast.success(t("screenTimeUpdated"));
  } catch {
    toast.error(t("failedToUpdateScreenTime"));
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="relative min-h-[340px] max-w-fit rounded-2xl bg-white px-8 py-10 md:w-full md:min-w-[420px]">
      <h1 className="text-[1.3rem] font-semibold text-mainColor">
        {t("bulkScreenTimeRestrictions")}
      </h1>
      <h2 className="mt-2 mb-10 text-[14px] font-medium">
        {t("setScreenTimeAllStudents")}
      </h2>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
          <div className="text-mainColor">{t("updating")}</div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 md:justify-start">
        {timeLimits?.length > 0 ? (
          timeLimits.map((time, index: number) => (
            <TeacherScreenTimeComponent
              key={`${time.dayOfTheWeek}-${index}`}
              time={time}
              updateScreenTimeForChild={updateTime}
              index={index}
            />
          ))
        ) : (
          <div className="text-gray-500">{t("loadingTimeLimits")}</div>
        )}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          <Trans ns="teacher" i18nKey="changesApplyAllStudents" components={{ strong: <strong /> }}>
            Changes will apply to <strong>all students</strong> in the class
          </Trans>
        </p>
      </div>
    </div>
  );
};

export default ClassScreenTimeBulk;