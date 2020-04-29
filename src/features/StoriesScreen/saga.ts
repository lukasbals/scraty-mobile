import { takeEvery, put } from "redux-saga/effects";
import {
  updateStories,
  loadStoriesFromBackendStart,
  loadStoriesError,
} from "./slice";
import Board from "../../models/Board";

interface loadStoriesFromBackendWorkerProps {
  payload: Board;
}

function* loadStoriesFromBackendWorker({
  payload,
}: loadStoriesFromBackendWorkerProps) {
  try {
    const response = yield fetch(payload.url).then((res) => res.json());
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
