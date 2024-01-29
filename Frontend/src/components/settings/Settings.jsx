import React, { useContext, useState } from "react";
import Profile from "../profile/Profile";
import SideMenu from "../sideMenu/SideMenu";
import "./Settings.css";
import { context } from "../../context/context";
import UpdateUserDetails from "../UpdateUserDetails/UpdateUserDetails";
import SelectCurrency from "../selectCurrency/SelectCurrency";
import ChangeProfileImg from "../changeProfileImg/ChangeProfileImg";

export default function Settings() {
  const { darkMode, setDarkMode, state, dispatch } = useContext(context);
  const [isUpdateUserDetails, setIsUpdateUserDetails] = useState(false);
  const [isHelpShow, setIsHelpShow] = useState(false);
  const [isSelectCurrency, setIsSelectCurrency] = useState(false);
  const [isDarkLight, setIsDarkLight] = useState(false);
  const [isChangeImg, setIsChangeImg] = useState(true);

  // Toggle the visibility of the profile picture change section
  function changProfilePic() {
    setIsChangeImg(!isChangeImg);
    setIsUpdateUserDetails(false);
    setIsSelectCurrency(false);
  }

  // Toggle the visibility of the profile details update section
  function showUpdateUserDetails() {
    setIsUpdateUserDetails(!isUpdateUserDetails);
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
    setIsChangeImg(false);
  };
  return (
    <div className="Settings">
      <SideMenu />
      <div className="SettingHero">
        <h1>Settings</h1>
        <main className="mainSettings">
          <div className="settings-spacebtwn">
            <div>
              <ul className="settings-ul">
                <li>
                  <button className="settings-btn" onClick={changProfilePic}>
                    {" "}
                    Change Profile Picture
                  </button>
                </li>
                <li>
                  <button
                    className="settings-btn"
                    onClick={showUpdateUserDetails}
                  >
                    Update Profile Details
                  </button>
                </li>
                <li>
                  <button
                    className="settings-btn"
                    onClick={handleChageCurrency}
                  >
                    Change Currency
                  </button>
                </li>

                <li>
                  <button className="settings-btn-dark-ligth" onClick={toogleDarkMode}>
                    {isDarkLight ? "Light Mode" : "Dark Mode"}
                  </button>
                </li>
              </ul>
            </div>

            {/* Render the corresponding components based on state */}
            <div className="sub-settings">
              <div>{isUpdateUserDetails && <UpdateUserDetails />}</div>
              <div>{isHelpShow && <Help />}</div>
              <div >{isSelectCurrency && <SelectCurrency />}</div>
              <div>{isChangeImg && <ChangeProfileImg />}</div>
            </div>
          </div>
        </main>
      </div>

      <Profile />
    </div>
  );
}
