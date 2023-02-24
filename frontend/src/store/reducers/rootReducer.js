import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ClientReducer from "./ClientReducer";
import CommonReducer from "./CommonReducer";
import HodReducer from "./HodReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  common: CommonReducer,
  client: ClientReducer,
  Hod: HodReducer,
});

export default rootReducer;
