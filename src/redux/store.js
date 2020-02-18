import { createStore, combineReducers } from "redux";
import solverReducer from "./solver/solverReducer";

const reducer = combineReducers({
    solver: solverReducer
});

export default createStore(reducer);
