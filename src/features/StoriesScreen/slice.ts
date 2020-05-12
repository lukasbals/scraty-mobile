import { createSlice } from "@reduxjs/toolkit";
import Story from "../../models/Story";

interface StoryPayload {
  payload: Story;
}

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loadStoriesFromBackendWithoutLoadingStart: (state, { payload }) => state,
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
    addStory: (state: any, { payload }: StoryPayload) => ({
      ...state,
      stories: [...state.stories, payload],
    }),
    deleteStory: (state: any, { payload }: StoryPayload) => {
      const newStories = state.stories.filter(
        (story: Story) => story.id !== payload.id
      );
      return { ...state, stories: newStories };
    },
    updateStory: (state: any, { payload }: StoryPayload) => {
      const newStories = state.stories.map((story: Story) =>
        story.id === payload.id ? payload : story
      );
      return { ...state, stories: newStories };
    },
  },
});

export const {
  loadStoriesFromBackendStart,
  loadStoriesFromBackendWithoutLoadingStart,
  updateStories,
  loadStoriesError,
  addStory,
  deleteStory,
  updateStory,
} = storiesSlice.actions;

export default storiesSlice.reducer;
