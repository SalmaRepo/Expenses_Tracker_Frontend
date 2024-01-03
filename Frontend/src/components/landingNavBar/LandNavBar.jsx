import React from 'react'
import {Link} from "react-router-dom"

export default function LandNavBar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Logo</Link>
        </li>
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
