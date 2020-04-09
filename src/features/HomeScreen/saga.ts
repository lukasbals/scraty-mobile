import { takeEvery, put } from "redux-saga/effects";
import {
  loadBoardsFromStorageStart,
  loadBoardsFromStorageSuccess,
} from "./slice";

function* loadBoardsFromStorageWorker() {
  // TODO: Load baords from storage
  const boards = ["board1", "board2"];
  yield put(loadBoardsFromStorageSuccess(boards));
}

export function* loadBoardsFromStorageWatcher() {
  yield takeEvery(loadBoardsFromStorageStart, loadBoardsFromStorageWorker);
}
