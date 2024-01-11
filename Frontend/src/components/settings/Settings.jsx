import React, { useContext, useRef } from "react";
import Profile from "../profile/Profile";
import SideMenu from "../sideMenu/SideMenu";
import "./Settings.css";
import { useNavigate } from "react-router-dom";
import { context } from "../../context/context";

export default function Settings() {
  const navigate = useNavigate();
  const currencySelector = useRef();
  const { darkMode, setDarkMode, state, dispatch } = useContext(context);
  console.log(darkMode);

  
  function showHelp() {
    navigate("/help");
  }

  function showUpdateUserDetails() {
    navigate("/UpdateUserDetails");
  }


  function toogleDarkMode() {
    setDarkMode(!darkMode);
  }

  const handleChageCurrency = () => {
    navigate("/selectCurrency")
  };

  return (
    <div className="Settings">
      <SideMenu />

      <div className="SettingHero">
        <h1>Settings</h1>

        <ul className="SettingsMiddle">
          <li>
            <button>Change Password</button>
          </li>
          <li>
            <button>Change Profile Picture</button>
          </li>
          <li>
            <button onClick={showUpdateUserDetails}>Update Profile Details</button>
          </li>
          <li>
            {/* <label for="dropdown">Currency:</label>
            <select id="dropdown" name="dropdown" ref={currencySelector} onChange={handleCurrency}>
              <option value="Euros">Euros</option>
              <option value="Dollars">Dollars</option>
              <option value="Pesos">Pesos</option>
              <option value="Yuan">Yuan</option>
              <option value="Other">Other</option>
            </select> */}
            <button onClick={handleChageCurrency}>Change Currency</button>
          </li>
          {state.currency === "Other" && (
            <form action="" onSubmit={handleOtherCurrency}>
              <input type="text" name="otherCurrency" />
              <button type="submit">Submit</button>
            </form>
          )}

          <li>
            <button onClick={showHelp}>Help/FAQ</button>
          </li>
          <li>
            <button onClick={toogleDarkMode}>Dark Mode</button>
          </li>
        </ul>
      </div>
      <Profile/>
    </div>
  );
}
