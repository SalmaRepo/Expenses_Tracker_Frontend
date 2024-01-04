import React from 'react'
import "./sideMenu.css"
import {Link} from "react-router-dom"

export default function SideMenu() {
  return (
    <div className="sideBar">
        <div className="sideBarTop">
          <p>Logo</p>
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
              <Link to="/logout">Logout</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </div>
      </div>
  )
}
