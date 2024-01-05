import { Link } from "react-router-dom"; //import because we are using it in line 12
//import './logout.css'


function LogOut() {
  //brings it from onClick
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
