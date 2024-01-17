import React, { useState, useContext } from "react";
import "./UpdateUserDetails.css";
import { context } from "../../context/context";
import axios from "axios";
import BASE_URL from "../../config/urlConfig";

function UpdateUserDetails() {
  const { state, dispatch } = useContext(context);
  const [firstName, setFirstName] = useState(state.user?.firstName);
  const [lastName, setLastName] = useState(state.user?.lastName);

  // Fetch user details by ID from the server
  const getUserById = () => {
    if (state.user) {
      const token = localStorage.getItem("token");

      // Fetch user details using the user's ID
      fetch(`${BASE_URL}/api/users/getUserById/${state.user?._id}`, {
        method: "GET",
        headers: {
          token: token,
        },
      })
        .then((res) => res.json())
        .then((result) => dispatch({ type: "setUser", payload: result.data }))
        .catch((err) => console.log(err));
    }
  };

  // Update user details on the server
  const UpdateDetails = () => {
    const newData = {
      ...state.user,
      firstName: firstName,
      lastName: lastName,
    };
    const token = localStorage.getItem("token");

    //PATCH request to update user details
    axios
      .patch(`${BASE_URL}/api/users/updateUserDetailsById`, newData, {
        headers: { token: token },
      })
      .then((response) => console.log("updated"))
      .catch((err) => console.log(err));

    // Fetch and update the user details after the update
    getUserById();
  };

  return (
    <div className="UpdateDetails">
      <div className="UpdateDetailsHero">
        <h1>Update User Details</h1>
        <label htmlFor="First Name"> First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="Last Name"> Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type="button" onClick={UpdateDetails}>
          Update
        </button>
      </div>
    </div>
  );
}

export default UpdateUserDetails;
