import { createSlice } from "@reduxjs/toolkit";

const storiesSlice = createSlice({
  name: "stories",
  initialState: {
    stories: null,
    loading: true,
    error: null,
  },
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loadStoriesFromBackendStart: (state, { payload }) => ({
      ...state,
      loading: true,
      error: null,
    }),
    updateStories: (state, { payload }) => ({
      ...state,
      loading: false,
      stories: payload,
    }),
    loadStoriesError: (state, { payload }) => ({
      ...state,
      stories: null,
      error: payload,
    }),
  },
});

export const {
  loadStoriesFromBackendStart,
  updateStories,
  loadStoriesError,
} = storiesSlice.actions;

export default storiesSlice.reducer;
