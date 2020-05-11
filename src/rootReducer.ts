import { combineReducers } from "@reduxjs/toolkit";
import boardsSlice from "./features/HomeScreen/slice";
import storiesSlice from "./features/StoriesScreen/slice";
import tasksSlice from "./features/TaskScreen/slice";

export default combineReducers({
  boards: boardsSlice,
  stories: storiesSlice,
  tasks: tasksSlice,
});
