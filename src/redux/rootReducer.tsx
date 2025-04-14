import { combineReducers } from "redux";
import { userSlice } from "./reducer/userSlice";

const rootReducer=combineReducers({
    user:userSlice
})

export default rootReducer;