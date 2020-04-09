import { createSlice } from "@reduxjs/toolkit";

const boardsSlice = createSlice({
  name: "todos",
  initialState: {
    boards: [],
    loading: false,
  },
  reducers: {
    loadBoardsFromStorageStart: (state) => ({
      ...state,
      loading: true,
    }),
    loadBoardsFromStorageSuccess: (state, { payload }) => ({
      ...state,
      loading: false,
      boards: payload,
    }),
  },
});

export const {
  loadBoardsFromStorageStart,
  loadBoardsFromStorageSuccess,
} = boardsSlice.actions;

export default boardsSlice.reducer;
