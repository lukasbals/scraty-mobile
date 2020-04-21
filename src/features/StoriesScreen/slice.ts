import { createSlice } from "@reduxjs/toolkit";

const storiesSlice = createSlice({
  name: "stories",
  initialState: {
    stories: null,
    loading: false,
  },
  reducers: {
    loadStoriesFromBackendStart: (state) => ({ ...state, loading: true }),
    updateStories: (state, { payload }) => ({
      ...state,
      loading: false,
      stories: payload,
    }),
  },
});

export const {
  loadStoriesFromBackendStart,
  updateStories,
} = storiesSlice.actions;

export default storiesSlice.reducer;
