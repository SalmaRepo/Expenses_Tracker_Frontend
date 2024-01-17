import { Link } from "react-router-dom";
import { useContext } from "react";
import { context } from "../../context/context";

function LogOut() {
  const { state, dispatch } = useContext(context);
  const logoutUser = () => {
    localStorage.removeItem("token");
    dispatch({ type: "setUser", payload: null });
    navigate("/login");
  };

  return (
    <div className="logout">
      <Link to="/login" onClick={logoutUser}>
        Logout
      </Link>
    </div>
  );
}
export default LogOut;
