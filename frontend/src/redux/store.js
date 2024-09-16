import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer"; // Importez vos reducers

const store = configureStore({
  reducer: rootReducer,
});

export default store;
