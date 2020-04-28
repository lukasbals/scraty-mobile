import { takeEvery, put } from "redux-saga/effects";
import { updateStories, loadStoriesFromBackendStart } from "./slice";
// eslint-disable-next-line no-unused-vars
import Board from "../../models/Board";

interface loadStoriesFromBackendWorkerProps {
  payload: Board;
}

function* loadStoriesFromBackendWorker({
  payload,
}: loadStoriesFromBackendWorkerProps) {
  try {
    // TODO: Pass the url to fetch the board and fetch the stories
    // for the given board
    const response = yield fetch(payload.url).then((res) => res.json());
    yield put(updateStories(response.stories));
  } catch (error) {
    console.error("Error while loading stories from backend", error);
  }
}

export function* loadStoriesFromBackendWatcher() {
  yield takeEvery(loadStoriesFromBackendStart, loadStoriesFromBackendWorker);
}
