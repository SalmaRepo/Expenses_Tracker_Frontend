import React, { useContext, useState } from "react";
import Profile from "../profile/Profile";
import SideMenu from "../sideMenu/SideMenu";
import "./Settings.css";
import { context } from "../../context/context";
import UpdateUserDetails from "../UpdateUserDetails/UpdateUserDetails";
import Help from "../Help/Help";
import SelectCurrency from "../selectCurrency/SelectCurrency";
import ChangeProfileImg from "../changeProfileImg/ChangeProfileImg";

export default function Settings() {
  const { darkMode, setDarkMode, state, dispatch } = useContext(context);
  const [isUpdateUserDetails, setIsUpdateUserDetails] = useState(false);
  const [isHelpShow, setIsHelpShow] = useState(false);
  const [isSelectCurrency, setIsSelectCurrency] = useState(false);
  const [isDarkLight, setIsDarkLight] = useState(false);
  const [isChangeImg, setIsChangeImg] = useState(false);
 
  // Toggle the visibility of the profile picture change section
  function changProfilePic() {
    setIsChangeImg(!isChangeImg);
    setIsUpdateUserDetails(false);
    setIsSelectCurrency(false);
  }

  // Toggle the visibility of the help section
  function showHelp() {
    setIsHelpShow(!isHelpShow);
    setIsUpdateUserDetails(false);
    setIsSelectCurrency(false);
    setIsChangeImg(false);
  }

  // Toggle the visibility of the profile details update section
  function showUpdateUserDetails() {
    setIsUpdateUserDetails(!isUpdateUserDetails);
    setIsHelpShow(false);
    setIsSelectCurrency(false);
    setIsChangeImg(false);
  }
  
  // Toggle between dark and light mode
  function toogleDarkMode() {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    setIsDarkLight(!isDarkLight);
    localStorage.setItem("darkMode", newDarkMode.toString());
  }

  // Handle the change of currency
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
            <button onClick={handleChageCurrency}>Change Currency</button>
          </li>

          <li>
            <button onClick={showHelp}>Help/FAQ</button>
          </li>
          <li>
            <button onClick={toogleDarkMode}>
              {isDarkLight ? "Light Mode" : "Dark Mode"}
            </button>
          </li>
        </ul>
       
       {/* Render the corresponding components based on state */}
        <div>{isUpdateUserDetails && <UpdateUserDetails />}</div>
        <div>{isHelpShow && <Help />}</div>
        <div>{isSelectCurrency && <SelectCurrency />}</div>
        <div>{isChangeImg && <ChangeProfileImg />}</div>
      </div>
      <Profile />
    </div>
  );
}
