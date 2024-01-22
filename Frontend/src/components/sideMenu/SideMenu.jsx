import React, { useState } from "react";
import "./sideMenu.css";
import { Link, NavLink } from "react-router-dom";
import LogOut from "../logout/Logout";

export default function SideMenu() {
  return (
    <div className="sideBar">
      <div className="sideBarTop">
        <Link to="/" className="sideBar-logo-container">
          <img
            className="logo"
            src="images/logoWhite.png"
            alt="logo of the project"
          />
          <span>Expensify</span>
        </Link>
        <ul>
          <li>
            <NavLink to="/home" className="sideNav-Link">
              <i class="fa-solid fa-house"></i>
              <span>Home Page</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/addExpenses" className="sideNav-Link">
              <i class="fa-solid fa-square-minus"></i>
              <span>Add Expenses</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/addIncomes" className="sideNav-Link">
              <i class="fa-solid fa-square-plus"></i>
              <span>Add Incomes</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" className="sideNav-Link">
            <i class="fa-solid fa-chart-area"></i><span>Dashboard</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="sideBarBottom">
        <ul>
          <li>
            <NavLink to="/settings" className="sideNav-Link">
              <i class="fa-solid fa-gear"></i>
              <span>Settings</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/help" className="sideNav-Link">
              <i class="fa-solid fa-circle-question"></i><span>Help/FAQ</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="sideNav-Link">
              <LogOut />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
