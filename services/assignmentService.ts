import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "axios.config";
import { openErrorModal } from "store/fetchSlice";
import { AssignmentDetails } from "types/interfaces";
import { getAccessToken } from "utils/getTokens";

export const addNewAssignments: any = createAsyncThunk(
  "newAssignmentSlice/addNewAssignments",
  async (
    {
      assignment,
      actionType,
      showModal,
      modalType,
    }: {
      assignment: AssignmentDetails;
      actionType: string;
      showModal: (modalName: string) => void;
      modalType: string;
    },
    thunkApi
  ) => {
    const dispatch = thunkApi.dispatch;
    const errors: string[] = [];
    // check errors
    if (assignment.title === "") {
      errors.push("Kindly Add an assignment title");
    }
    if (!assignment.isCurrent && assignment.date === "") {
      errors.push(
        "Assignment should have a start date since it is scheduled for later"
      );
    }
    if (!assignment.isCurrent && new Date(assignment.date) === new Date()) {
      errors.push(
        "Assignment date should not be todays since it is schedule for later"
      );
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
    const mainAssignment = { ...assignment, status: actionType };
    console.log(mainAssignment);
    try {
      if (errors.length === 0) {
        // const { data } = await http.post("", mainAssignment, {
        //   headers: {
        //     Authorization: `Bearer ${getAccessToken()}`,
        //   },
        // });
        // console.log(data);
        showModal(modalType);
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
    try {
      const { data } = await http.get("", {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      console.log(data);
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
