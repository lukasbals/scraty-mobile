import { all } from "redux-saga/effects";
import {
  loadBoardsFromStorageWatcher,
  addBoardWatcher,
  removeBoardWatcher,
  updateBoardWatcher,
} from "./features/HomeScreen/saga";
import {
  loadStoriesFromBackendWatcher,
  loadStoriesFromBackendWithoutLoadingWatcher,
} from "./features/StoriesScreen/saga";

function* scratySaga() {
  yield all([
    // Fetch boards
    loadBoardsFromStorageWatcher(),
    loadStoriesFromBackendWithoutLoadingWatcher(),

    // Add a new board
    addBoardWatcher(),

    // Remove a board
    removeBoardWatcher(),

    // Update a board
    updateBoardWatcher(),

    // Load stories from backend
    loadStoriesFromBackendWatcher(),
  ]);
}

export default scratySaga;
