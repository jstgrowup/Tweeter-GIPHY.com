import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./UserReducer";


const rootredeucer = combineReducers({
    user: userReducer,
});
export const store = legacy_createStore(rootredeucer, applyMiddleware(thunk));
