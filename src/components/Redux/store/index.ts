import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { reducer } from "./users.redux";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
