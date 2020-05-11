import { createSlice } from "@reduxjs/toolkit";
import Task from "../../models/Task";

interface TaskPayload {
  payload: Task;
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: null,
  },
  reducers: {
    setTasks: (state, { payload }) => ({
      ...state,
      tasks: payload,
    }),
    addTask: (state: any, { payload }: TaskPayload) => ({
      ...state,
      tasks: [...state.tasks, payload],
    }),
    deleteTask: (state: any, { payload }: TaskPayload) => {
      const newTasks = state.tasks.filter(
        (task: Task) => task.id !== payload.id
      );
      return { ...state, tasks: newTasks };
    },
    updateTask: (state: any, { payload }: TaskPayload) => {
      const newTasks = state.tasks.map((task: Task) =>
        task.id === payload.id ? payload : task
      );
      return { ...state, tasks: newTasks };
    },
  },
});

export const { setTasks, addTask, deleteTask, updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;
