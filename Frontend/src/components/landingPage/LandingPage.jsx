import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LandNavBar from "../landingNavBar/LandNavBar";
import "./landingPage.css";
import About from "../about/About";
import Footer from "../footer/Footer";
import { context } from "../../context/context";
import BASE_URL from "../../config/urlConfig";

export default function LandingPage() {
  const { state, dispatch } = useContext(context);
  const navigate = useNavigate();

  // Handle the Get Started button
  const getStarted = () => {
    const token = localStorage.getItem("token");
    if (token && state.user) {
      navigate("/home");

      // Fetching user data based on the user's ID
      fetch(`${BASE_URL}/api/users/getUserById/${state.user?._id}`, {
        method: "GET",
        headers: { token: token },
      })
        .then((res) => res.json())
        .then((result) => dispatch({ type: "setUser", payload: result.data }))
        .catch((err) => console.log(err));
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="landingPage">
      <LandNavBar />
      <div className="landingPage-Hero">
        <h1 className="landTitle">Welcome to Expenses-Tracker</h1>
        <button onClick={() => getStarted()} className="getStarted">
          Get Started
        </button>
      </div>
      <About />
      <Footer />
    </div>
  );
}
