
import React, {useContext} from 'react'
import { context } from '../../context/context';
import './profile.css';
import Balance from "../balance/Balance";

export default function Profile() {
  const { state, dispatch } = useContext(context); 
  
  console.log(state.user)
  
  const userName = state.user ? state.user.firstName : "N/A";
  const email = state.user ? state.user.email : "N/A";
  //console.log("User data:", state.user );

  return (
    <>
  { state.user && (<div className="profile">
      <div className="page">
        <div className="profile-image-container"></div>
        <p>User Name: {userName}</p>
        <p>Email: {email}</p>
      </div>
      <div className="balance">
        <Balance userId={state.user._id} />
      </div>
    </div>)}
    </>
  );
}


