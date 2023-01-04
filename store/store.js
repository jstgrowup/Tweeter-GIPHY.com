import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./UserRedux/UserReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
const persistzConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootredeucer = combineReducers({
  user: userReducer,
});
const persistedreducer = persistReducer(persistzConfig, rootredeucer);
export const store = legacy_createStore(
  persistedreducer,
  applyMiddleware(thunk)
);
