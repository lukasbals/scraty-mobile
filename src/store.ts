import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import scratySaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({ serializableCheck: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(scratySaga);

export default store;
