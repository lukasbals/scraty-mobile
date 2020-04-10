import { all } from "redux-saga/effects";
import {
  loadBoardsFromStorageWatcher,
  addBoardWatcher,
  removeBoardWatcher,
} from "./features/HomeScreen/saga";

function* scratySaga() {
  yield all([
    // Fetch boards
    loadBoardsFromStorageWatcher(),

    // Add a new board
    addBoardWatcher(),

    // Remove a board
    removeBoardWatcher(),
  ]);
}

export default scratySaga;
