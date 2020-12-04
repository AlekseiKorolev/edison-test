import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// redux
import { Provider } from "react-redux";
import store from "./redux/store";

// compoents
import AuthRoute from "./util/auth-route";
import Home from "./pages/home/home";
import SignIn from "./pages/signin/signin";

import "./custom.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <AuthRoute exact path="/" component={Home} />
          <Route path="/signup" component={SignIn} />
          <Route path="/signin" component={SignIn} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
