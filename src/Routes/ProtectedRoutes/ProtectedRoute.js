import React, { useContext, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../../Store/Store";

const ProtectedRoute = ({
  redirectTo = "/login",
  children,
}) => {
  const {isLoginCorrect} = useContext(AuthContext)
  const [redirect, setRedirect] = useState(false);
  if (isLoginCorrect) {
    return children ? children : <Outlet />;
  }
  if (!isLoginCorrect && !redirect) {
    setTimeout(() => {
      setRedirect(true);
    }, 3000);
    return (
      <>
        <p style={{ fontSize: "1.5rem", margin: "7rem 0 4rem" }}>
          This info is top secret.
          <br /> Please login using authorized email & password.
        </p>
        <h1>Redirecting to Login page...</h1>
      </>
    );
  }
  if (redirect) {
    return <Navigate replace to={redirectTo} />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;