import React from 'react'
import "./sideMenu.css"
import {Link} from "react-router-dom"
import LogOut from '../logout/Logout'

export default function SideMenu() {
  return (
    <div className="sideBar">
        <div className="sideBarTop">
        <Link to="/"><img className='logo' src="images/logoWhite.png" alt="logo of the project" /></Link>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/addExpenses">Add Expenses</Link>
            </li>
            <li>
              <Link to="/addIncomes">Add Incomes</Link>
            </li>
            <li>
              <Link to="/history">History</Link>
            </li>
          </ul>
        </div>
        <div className="sideBarBottom">
          <ul>
            
            <li>
              <Link to="/settings">Settings</Link>
            </li>
             
            <li>
              <Link to="/help">Help/FAQ</Link>
            </li>
            <li>
              <Link to="/login"><LogOut/></Link>
            </li>
          </ul>
        </div>
      </div>
  )
}
