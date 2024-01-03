import React from 'react'
import {Link} from "react-router-dom"
import "./landingNavbar.css"

export default function LandNavBar() {
  return (
    <div className='landingNavBar'>
       <Link to="/">Logo</Link>
      <ul className='landingNavList'> 
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/Login">Login</Link>
        </li>
        <li>
          <Link to="/SignUp">Sign-Up</Link>
        </li>
      </ul>


    </div>
  
  )
}
