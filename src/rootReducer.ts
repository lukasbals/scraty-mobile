import { combineReducers } from "@reduxjs/toolkit";
import boardsSlice from "./features/HomeScreen/slice";

export default combineReducers({
  boards: boardsSlice,
});
