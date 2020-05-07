import { takeEvery, put, call } from "redux-saga/effects";
import {
  loadBoardsFromStorageStart,
  addBoardStart,
  updateBoards,
  removeBoardStart,
  updateBoardStart,
} from "./slice";
import { AsyncStorage } from "react-native";
import Board from "../../models/Board";

function* loadBoardsFromStorageWorker() {
  try {
    const value = yield call(AsyncStorage.getItem, "boards");
    const boards = value !== null ? JSON.parse(value) : [];
    yield put(updateBoards(boards));
  } catch (error) {
    console.info("Error while loading boards from AsyncStorage");
  }
}

function* addBoardWorker({ payload }: any) {
  try {
    const value = yield call(AsyncStorage.getItem, "boards");
    const boards: Board[] = value !== null ? JSON.parse(value) : [];

    boards.push(payload);

    yield call(AsyncStorage.setItem, "boards", JSON.stringify(boards));
    yield put(updateBoards(boards));
  } catch (error) {
    console.info("Error while adding new board to the AsyncStorage");
  }
}

function* removeBoardWorker({ payload }: any) {
  try {
    const value = yield call(AsyncStorage.getItem, "boards");
    const boards: Board[] = value !== null ? JSON.parse(value) : [];

    const selectedBoardValue = yield call(
      AsyncStorage.getItem,
      "selectedBoard"
    );
    const selecteBoard: Board =
      selectedBoardValue !== null ? JSON.parse(selectedBoardValue) : null;

    if (selecteBoard && selecteBoard.id === payload) {
      yield call(AsyncStorage.removeItem, "selectedBoard");
    }

    const newBoards = boards.filter((board: Board) => board.id !== payload);

    yield call(AsyncStorage.setItem, "boards", JSON.stringify(newBoards));
    yield put(updateBoards(newBoards));
  } catch (error) {
    console.info("Error while removing a board from the AsyncStorage");
  }
}

function* updateBoardWorker({ payload }: any) {
  try {
    const value = yield call(AsyncStorage.getItem, "boards");
    const boards: Board[] = value !== null ? JSON.parse(value) : [];

    const changedBoardIndex = boards.findIndex(
      (board: Board) => board.id === payload.id
    );
    boards[changedBoardIndex] = payload;

    yield call(AsyncStorage.setItem, "boards", JSON.stringify(boards));
    yield put(updateBoards(boards));
  } catch (error) {
    console.info("Error while updating a board in the AsyncStorage");
  }
}

export function* loadBoardsFromStorageWatcher() {
  yield takeEvery(loadBoardsFromStorageStart, loadBoardsFromStorageWorker);
}

export function* addBoardWatcher() {
  yield takeEvery(addBoardStart, addBoardWorker);
}

export function* removeBoardWatcher() {
  yield takeEvery(removeBoardStart, removeBoardWorker);
}

export function* updateBoardWatcher() {
  yield takeEvery(updateBoardStart, updateBoardWorker);
}
