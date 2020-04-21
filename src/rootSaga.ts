import { all } from "redux-saga/effects";
import {
  loadBoardsFromStorageWatcher,
  addBoardWatcher,
  removeBoardWatcher,
} from "./features/HomeScreen/saga";
import { loadStoriesFromBackendWatcher } from "./features/StoriesScreen/saga";

function* scratySaga() {
  yield all([
    // Fetch boards
    loadBoardsFromStorageWatcher(),

    // Add a new board
    addBoardWatcher(),

    // Remove a board
    removeBoardWatcher(),

    // Load stories from backend
    loadStoriesFromBackendWatcher(),
  ]);
}

export default scratySaga;
