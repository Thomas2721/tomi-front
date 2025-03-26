import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? <Component /> : <Navigate to="/register" />;
};

export default PrivateRoute;
