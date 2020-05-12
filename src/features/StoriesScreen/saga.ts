import { takeEvery, put } from "redux-saga/effects";
import {
  updateStories,
  loadStoriesFromBackendStart,
  loadStoriesError,
  loadStoriesFromBackendWithoutLoadingStart,
} from "./slice";
import Board from "../../models/Board";

interface boardProps {
  payload: Board;
}

function* loadStoriesFromBackendWorker({ payload }: boardProps) {
  try {
    const response = yield fetch(
      `${payload.protocol}//${payload.host}:${payload.port}/api/stories/`
    ).then((res) => res.json());
    if (response) {
      yield put(updateStories(response.stories));
    }
  } catch (error) {
    yield put(loadStoriesError(error));
    console.info("Error while loading stories from backend", error);
  }
}

export function* loadStoriesFromBackendWatcher() {
  yield takeEvery(loadStoriesFromBackendStart, loadStoriesFromBackendWorker);
}

export function* loadStoriesFromBackendWithoutLoadingWatcher() {
  yield takeEvery(
    loadStoriesFromBackendWithoutLoadingStart,
    loadStoriesFromBackendWorker
  );
}
