import { createSlice } from "@reduxjs/toolkit";

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: [],
    loading: true,
  },
  reducers: {
    loadBoardsFromStorageStart: (state) => ({ ...state, loading: true }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addBoardStart: (state, { payload }) => ({ ...state, loading: true }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeBoardStart: (state, { payload }) => ({ ...state, loading: true }),
    updateBoards: (state, { payload }) => ({
      ...state,
      loading: false,
      boards: payload,
    }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateBoardStart: (state, { payload }) => ({ ...state, loading: true }),
  },
});

export const {
  loadBoardsFromStorageStart,
  addBoardStart,
  removeBoardStart,
  updateBoards,
  updateBoardStart,
} = boardsSlice.actions;

export default boardsSlice.reducer;
