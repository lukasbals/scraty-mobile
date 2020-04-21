import { takeEvery, put } from "redux-saga/effects";
import { updateStories, loadStoriesFromBackendStart } from "./slice";

function* loadStoriesFromBackendWorker() {
  try {
    // TODO: Pass the url to fetch the board and fetch the stories
    // for the given board
    const response = yield fetch(
      "http://192.168.178.24:8080/api/stories/"
    ).then((res) => res.json());
    yield put(updateStories(response.stories));
  } catch (error) {
    console.error("Error while loading stories from backend", error);
  }
}

export function* loadStoriesFromBackendWatcher() {
  yield takeEvery(loadStoriesFromBackendStart, loadStoriesFromBackendWorker);
}
