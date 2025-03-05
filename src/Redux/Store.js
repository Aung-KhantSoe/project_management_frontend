import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Auth/Reducer";
import chatReducer from "./Chat/Reducer";
import commentReducer from "./Comment/Reducer";
import issueReducer from "./Issue/Reducer";
import subscriptionReducer from "./Subscription/Reducer";
import { projectReducer } from "./Project/Reducer";
import { thunk } from "redux-thunk";

const rootReducer=combineReducers({
    auth:authReducer,
    project:projectReducer,
    chat:chatReducer,
    comment:commentReducer,
    issue:issueReducer,
    subscription:subscriptionReducer
});
export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))