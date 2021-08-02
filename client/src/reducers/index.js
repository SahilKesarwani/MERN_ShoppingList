import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
	item: itemReducer,
	auth: authReducer,
	error: errorReducer,
});
