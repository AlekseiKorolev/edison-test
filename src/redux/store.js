import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// reducers
import { reducer as formReducer } from "redux-form";
import userReducer from "./reducers/user-reducer";
import uiReducer from "./reducers/ui-reducer";
import voteReducer from "./reducers/vote-reducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  ui: uiReducer,
  vote: voteReducer,
  form: formReducer
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

export default store;
