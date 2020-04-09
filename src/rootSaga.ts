import { all } from "redux-saga/effects";
import { loadBoardsFromStorageWatcher } from "./features/HomeScreen/saga";

function* scratySaga() {
  yield all([
    // Fetch boards
    loadBoardsFromStorageWatcher(),
  ]);
}

export default scratySaga;
