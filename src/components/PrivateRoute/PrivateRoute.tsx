import { FC } from "react";
import { useAppContext } from "../../context/AppContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute: FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuth } = useAppContext();
  const location = useLocation();
  if (!isAuth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
