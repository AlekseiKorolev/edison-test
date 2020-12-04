import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = ({ component: Component, ...rest }) => {
  const authenticated = useSelector(state => state.user.authenticated);
  const loading = useSelector(state => state.ui.loading);
  return (
    (authenticated || !loading) && (
      <Route
        {...rest}
        render={props => {
          return authenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/signin" />
          );
        }}
      />
    )
  );
};

export default AuthRoute;
