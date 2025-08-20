import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import { authReducer } from "./Authentication/Reducer";
import { thunk } from "redux-thunk";
import { programReducer } from "./Program/Reducer";


const rooteReducer = combineReducers({
    auth: authReducer,
    program: programReducer,
});

export const store = legacy_createStore(rooteReducer, applyMiddleware(thunk));
