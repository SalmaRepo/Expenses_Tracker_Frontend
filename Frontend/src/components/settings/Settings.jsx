import React, { useContext, useRef, useState } from "react";
import Profile from "../profile/Profile";
import SideMenu from "../sideMenu/SideMenu";
import "./Settings.css";
import { useNavigate } from "react-router-dom";
import { context } from "../../context/context";
import UpdateUserDetails from "../UpdateUserDetails/UpdateUserDetails";
import Help from "../Help/Help";
import SelectCurrency from "../selectCurrency/SelectCurrency";
import ChangeProfileImg from "../changeProfileImg/ChangeProfileImg";

export default function Settings() {
  const navigate = useNavigate();
  const currencySelector = useRef();
  const { darkMode, setDarkMode, state, dispatch } = useContext(context);
  const [isUpdateUserDetails, setIsUpdateUserDetails] = useState(false);
  const [isHelpShow, setIsHelpShow] = useState(false);
  const [isSelectCurrency, setIsSelectCurrency] = useState(false);
  const [isDarkLight, setIsDarkLight] = useState(false);
  const [isChangeImg, setIsChangeImg] = useState(false);
  console.log(darkMode);
  function changProfilePic() {
    setIsChangeImg(!isChangeImg);
    setIsUpdateUserDetails(false);
    setIsSelectCurrency(false);
  }
  function showHelp() {
    // navigate("/help");
    setIsHelpShow(!isHelpShow);
    setIsUpdateUserDetails(false);
    setIsSelectCurrency(false);
    setIsChangeImg(false);
  }

  function showUpdateUserDetails() {
    setIsUpdateUserDetails(!isUpdateUserDetails);
    setIsHelpShow(false);
    setIsSelectCurrency(false);
    setIsChangeImg(false);
  }
  
  function toogleDarkMode() {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    setIsDarkLight(!isDarkLight);
    localStorage.setItem("darkMode", newDarkMode.toString());
  }
  const handleChageCurrency = () => {
    setIsSelectCurrency(!isSelectCurrency);
    setIsUpdateUserDetails(false);
    setIsHelpShow(false);
    setIsChangeImg(false);
  };
  return (
    <div className="Settings">
      <SideMenu />
      <div className="SettingHero">
        <h1>Settings</h1>
        <ul className="SettingsMiddle">
          {/* <li>
            <button>Change Password</button>
          </li> */}
          <li>
            <button onClick={changProfilePic}> Change Profile Picture</button>
          </li>
          <li>
            <button onClick={showUpdateUserDetails}>
              Update Profile Details
            </button>
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
            <button onClick={toogleDarkMode}>
              {isDarkLight ? "Light Mode" : "Dark Mode"}
            </button>
          </li>
        </ul>
        {/* <div>{isUpdateUserDetails? <UpdateUserDetails/>: <div><p>nothing</p></div>}</div> */}
        <div>{isUpdateUserDetails && <UpdateUserDetails />}</div>
        <div>{isHelpShow && <Help />}</div>
        <div>{isSelectCurrency && <SelectCurrency />}</div>
        <div>{isChangeImg && <ChangeProfileImg />}</div>
      </div>
      <Profile />
    </div>
  );
}
