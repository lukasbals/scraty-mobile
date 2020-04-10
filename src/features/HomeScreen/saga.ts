import { takeEvery, put, call } from "redux-saga/effects";
import {
  loadBoardsFromStorageStart,
  addBoardStart,
  updateBoards,
  removeBoardStart,
} from "./slice";
import { AsyncStorage } from "react-native";
// eslint-disable-next-line no-unused-vars
import Board from "../../models/Board";

function* loadBoardsFromStorageWorker() {
  try {
    const value = yield call(AsyncStorage.getItem, "boards");
    const boards = value !== null ? JSON.parse(value) : [];
    yield put(updateBoards(boards));
  } catch (error) {
    console.error("Error while loading boards from AsyncStorage");
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
    console.error("Error while adding new board to the AsyncStorage");
  }
}

function* removeBoardWorker({ payload }: any) {
  try {
    const value = yield call(AsyncStorage.getItem, "boards");
    const boards: Board[] = value !== null ? JSON.parse(value) : [];

    const newBoards = boards.filter((board: Board) => board.id !== payload);

    yield call(AsyncStorage.setItem, "boards", JSON.stringify(newBoards));
    yield put(updateBoards(newBoards));
  } catch (error) {
    console.error("Error while adding new board to the AsyncStorage");
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
