import { Link } from "react-router-dom"; //import because we are using it in line 12
//import './logout.css'
import {useContext} from "react"
import { context } from "../../context/context";

function LogOut() {
  //brings it from onClick
  const {state,dispatch}=useContext(context)
  const logoutUser = () => {
    localStorage.removeItem("token");
    dispatch({ type: "setUser", payload: null }); //when we are using set user.
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
