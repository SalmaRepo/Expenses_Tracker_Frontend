import React from 'react'
import {Link} from "react-router-dom"
import "./landingNavbar.css"
import {useContext} from "react" 
import {context} from "../../context/context"

export default function LandNavBar() {
  const {state, dispatch}= useContext(context)
  console.log(state)
  return (
    <div className='landingNavBar'>
       <Link to="/">Logo</Link>
      <ul className='landingNavList'> 
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
        <Link to="/login">{state.user?<LogOut/>:'Login'}</Link>
        </li>
        <li>
          <Link to="/SignUp">Sign-Up</Link>
        </li>
      </ul>


    </div>
  
  )
}
