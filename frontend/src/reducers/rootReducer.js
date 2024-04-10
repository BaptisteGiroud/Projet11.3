import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import logReducer from "./log.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  log: logReducer,
});

export default rootReducer;
