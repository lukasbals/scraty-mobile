import { createSlice } from "@reduxjs/toolkit";

const boardsSlice = createSlice({
  name: "todos",
  initialState: {
    boards: [],
    loading: false,
  },
  reducers: {
    loadBoardsFromStorageStart: (state) => ({ ...state, loading: true }),
    // eslint-disable-next-line no-unused-vars
    addBoardStart: (state, { payload }) => ({ ...state, loading: true }),
    // eslint-disable-next-line no-unused-vars
    removeBoardStart: (state, { payload }) => ({ ...state, loading: true }),
    updateBoards: (state, { payload }) => ({
      ...state,
      loading: false,
      boards: payload,
    }),
  },
});

export const {
  loadBoardsFromStorageStart,
  addBoardStart,
  removeBoardStart,
  updateBoards,
} = boardsSlice.actions;

export default boardsSlice.reducer;
