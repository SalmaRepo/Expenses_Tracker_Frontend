import React, { useContext, useEffect } from "react";
import { context } from "../../context/context";
import "./profile.css";
import BASE_URL from "../../config/urlConfig";
import Balance from "../balance/Balance";

export default function Profile() {
  const { state, dispatch } = useContext(context);
  const userName = state.user ? state.user.firstName : "N/A";
  const email = state.user ? state.user.email : "N/A";

  return (
    <>
      {state.user && (
        <div className="profile">
          <div className="page">
            {/*  <div className="profile-image-container"></div> */}
            <div className="profile-image-container">
              <img
                src={
                  !state.user?.userImage
                    ? "images/profilePic.jpg"
                    : `${BASE_URL}/${state.user?.userImage}`
                }
                style={{ width: "100px", height: "100px" }}
                alt="noImg"
              />
            </div>
            <p>User Name: {userName}</p>
            <p>Email: {email}</p>
          </div>
          <div className="balance">
            <Balance userId={state.user._id} />
          </div>
        </div>
      )}
    </>
  );
}
