import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// will remove later

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth0();
  console.log(user);
  return (
    <Route
      {...rest}
      render={() => (user ? children : <Redirect to="/" />)}
    ></Route>
  );
};
export default PrivateRoute;
