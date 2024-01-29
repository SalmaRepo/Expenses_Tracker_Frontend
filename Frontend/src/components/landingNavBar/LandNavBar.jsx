import React from "react";
import { Link } from "react-router-dom";
import "./landingNavbar.css";
import { useContext } from "react";
import { context } from "../../context/context";
import LogOut from "../logout/Logout";
import ProfileImg from "../profile/profileImg";

export default function LandNavBar() {
  const { state, dispatch, darkMode, setDarkMode } = useContext(context);

  return (
    <nav className="landingNav">
      <div className="landingNavBar">
        <div>
          <Link
            to="/"
            className="anchorLogo"
            onClick={() =>
              dispatch({
                type: "setIsOnSignAndLogin",
                payload: false,
              })
            }
          >
            <img
              className="logo-NavBar"
              src="images/LOGO.png"
              alt="logo of the project"
            />
          </Link>
        </div>
        <ul className="landingNavList">
          <li>
            {state.isOnSignAndLogin ? (
              <Link to="/about">About</Link>
            ) : (
              <a href="#about"> About </a>
            )}
          </li>
          <li>
            <Link
              to="/SignUp"
              onClick={() =>
                dispatch({
                  type: "setIsOnSignAndLogin",
                  payload: true,
                })
              }
            >
              Sign-Up
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              onClick={() =>
                dispatch({
                  type: "setIsOnSignAndLogin",
                  payload: true,
                })
              }
            >
              {state.user ? <LogOut /> : "Login"}
            </Link>
          </li>
          {window.innerWidth > 760 && (
            <li>
              <ProfileImg />
              {/* <p>Hi {state.user?.firstName?state.user?.firstName:'User'}</p> */}
            </li>
          )}
          <li>
            {darkMode ? (
              <i className="fa-solid fa-sun" onClick={() => {
                setDarkMode(false)
                localStorage.setItem("darkMode",false)
              }}></i>
            ) : (
              <i className="fa-solid fa-moon" onClick={() => {
                setDarkMode(true)
                localStorage.setItem("darkMode",true)
              }}></i>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
