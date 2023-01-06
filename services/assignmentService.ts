import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "axios.config";
import { openErrorModal } from "store/fetchSlice";
import { RootState } from "store/store";
import { AssignmentDetails } from "types/interfaces";
import { getAccessToken } from "utils/getTokens";

const checkAssignmentErrors = (assignment: AssignmentDetails): string[] => {
  const errors: string[] = [];
  // check errors
  if (assignment.title === "") {
    errors.push("Kindly Add an assignment title");
  }
  if (!assignment.is_current && assignment.start_date === "") {
    errors.push(
      "Assignment should have a start date since it is scheduled for later"
    );
  }
  if (
    !assignment.is_current &&
    new Date(assignment.start_date) === new Date()
  ) {
    errors.push(
      "Assignment date should not be todays since it is schedule for later"
    );
  }
  if (assignment.end_date === "") {
    errors.push("Kindly add an end date/deadline");
  }
  if (assignment.number == 0) {
    errors.push("Kindly set number of questions");
  }
  if (assignment.skills.length === 0) {
    errors.push("Select one or more assignment skills");
  }
  if (assignment.students.length === 0) {
    errors.push("Select students(s) to be assigned to this tasks");
  }
  return errors;
};

export const addNewAssignments: any = createAsyncThunk(
  "newAssignmentSlice/addNewAssignments",
  async (
    {
      assignment,
      actionType,
      showModal,
      modalType,
      resetAssignments,
    }: {
      assignment: AssignmentDetails;
      actionType: string;
      showModal: (modalName: string) => void;
      modalType: string;
      resetAssignments: () => void;
    },
    thunkApi
  ) => {
    const state: any = thunkApi.getState();
    const { id, is_current, is_finished, start_date } =
      state.unit.currentUnitInView;
    const dispatch = thunkApi.dispatch;
    const errors: string[] = checkAssignmentErrors(assignment);

    // if it is past
    if (is_finished) {
      errors.push(
        "The Current Unit is a past current, therefore, assignments cannot be added"
      );
    }
    if (!is_current && !is_finished && new Date(start_date) > new Date()) {
      errors.push(
        "This unit is scheduled for a later date, kindly update to current before adding assignments"
      );
    }
    if (new Date(assignment.end_date) < new Date(assignment.start_date)) {
      errors.push("Deadline should be after the start date");
    }
    const mainAssignment: any = { ...assignment, status: actionType };

    mainAssignment.skills = assignment.skills.map((skill) => {
      return { skillId: parseInt(skill.skillId) };
    });
    try {
      if (errors.length === 0) {
        const { data } = await http.post(
          `/academics/curriculums/units/${id}/assignment/`,
          mainAssignment,
          {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          }
        );
        showModal(modalType);
        resetAssignments();
        dispatch(getAssignments());
      } else {
        dispatch(openErrorModal({ errorText: [...errors] }));
      }
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateAssignment: any = createAsyncThunk(
  "newAssignmentSlice/updateAssignment",
  async (
    {
      assignment,
      actionType,
      showModal,
      modalType,
      resetAssignments,
      id: assignmentId,
    }: {
      assignment: AssignmentDetails;
      actionType: string;
      showModal: (modalName: string) => void;
      modalType: string;
      resetAssignments: () => void;
      id: string | number;
    },
    thunkApi
  ) => {
    const state: any = thunkApi.getState();
    const { id, is_current, is_finished, start_date } =
      state.unit.currentUnitInView;
    const dispatch = thunkApi.dispatch;
    const errors: string[] = checkAssignmentErrors(assignment);

    // if it is past
    if (is_finished) {
      errors.push(
        "The Current Unit is a past current, therefore, assignments cannot be added"
      );
    }
    if (!is_current && !is_finished && new Date(start_date) > new Date()) {
      errors.push(
        "This unit is scheduled for a later date, kindly update to current before adding assignments"
      );
    }
    if (new Date(assignment.end_date) < new Date(assignment.start_date)) {
      errors.push("Deadline should be after the start date");
    }
    const mainAssignment: any = { ...assignment, status: actionType };
    mainAssignment.skills = assignment.skills.map((skill) => {
      return { skillId: parseInt(skill.skillId) };
    });
    try {
      if (errors.length === 0) {
        const { data } = await http.put(
          `/academics/curriculums/units/${id}/assignment/${assignmentId}`,
          mainAssignment,
          {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          }
        );
        showModal(modalType);
        resetAssignments();
        dispatch(getAssignments());
      } else {
        dispatch(openErrorModal({ errorText: [...errors] }));
      }
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getAssignments: any = createAsyncThunk(
  "newAssignmentSlice/getAssignments",
  async (_, thunkApi) => {
    const state: any = thunkApi.getState();
    const { id } = state.unit.currentUnitInView;

    try {
      const { data } = await http.get(
        `/academics/curriculums/units/${id}/assignments/`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
