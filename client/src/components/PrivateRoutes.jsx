import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? children : <Navigate to="/" />;
};

export default PrivateRoute;
