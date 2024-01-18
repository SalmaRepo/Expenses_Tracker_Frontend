import React, { useContext } from "react";
import { context } from "../../context/context";
import "./profile.css";
import BASE_URL from "../../config/urlConfig";
import Balance from "../balance/Balance";

export default function Profile() {
  const { state, dispatch } = useContext(context);
  const userName = state.user ? `${state.user.firstName} ${state.user.lastName}` : "N/A";
  const email = state.user ? state.user.email : "N/A";

  return (
    <>
      {state.user && (
        <section className="profile">
          <div className="page">
            <div className="profile-image-container">
              <img
                src={
                  !state.user?.userImage
                    ? "images/profilePic.jpg"
                    : `${BASE_URL}/${state.user?.userImage}`
                }
                // todo delete style from here and add in css
                style={{ width: "100px", height: "100px" }}
                alt="noImg"
              />
            </div>
            <p>{userName} </p>
            <p>{email}</p>
          </div>
          <div className="balance">
            <Balance userId={state.user._id} />
          </div>
        </section>
      )}
    </>
  );
}
