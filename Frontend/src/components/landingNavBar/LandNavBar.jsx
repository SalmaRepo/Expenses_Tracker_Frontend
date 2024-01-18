import React from "react";
import { Link } from "react-router-dom";
import "./landingNavbar.css";
import { useContext } from "react";
import { context } from "../../context/context";
import LogOut from "../logout/Logout";


export default function LandNavBar() {
  const { state, dispatch } = useContext(context);

  return (
    <div className="landingNavBar">
      <div>
        <Link to="/" className="anchorLogo">
        <img
          className="logo-NavBar"
          src="images/logoWhite.png"
          alt="logo of the project"
        />
      </Link>
      </div>
      <ul className="landingNavList">
        <li>
          <Link href="#about"> About </Link>
        </li>
        <li>
          <Link to="/SignUp">Sign-Up</Link>
        </li>
        <li>
          <Link to="/login">{state.user ? <LogOut /> : "Login"}</Link>
        </li>
      </ul>
    </div>
  );
}
