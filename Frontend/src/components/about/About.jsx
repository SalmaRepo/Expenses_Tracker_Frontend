import React, { useContext } from 'react'
import "./about.css"
import LineChart from '../graph/lineChart';
import LandNavBar from '../landingNavBar/LandNavBar';
import { context } from '../../context/context';

export default function About() {
  const {state,dispatch}=useContext(context)
  return (
    <div id='about' className='about-container'>
      {state.isOnSignAndLogin&&<LandNavBar/>}

      <section className='headline'>
        <h1 className='first-line'>Why should you</h1>
        <h2 className='second-line'>use our Expenses-Tracker?</h2>
      </section>

      <img src="images/arrow.png" alt="arrow"  className='arrow-img' />
      <p className='reason'>
      We'll give you 3 very good reasons…
      </p>
       
      <main className="cards-container">
        
        {/* Card-1 */}
        <div className="card">
          <h2>Track your expenses and incomes</h2>
          <img className='imgOne' src="images/img-card1.jpg" alt="holding money"/>
          <p>You can track and manage your expenses with ease using our expense tracking app.</p>
        </div>

        {/* Card-2 */}
        <div className="card">
          <h2>Track expenses with graphs</h2>
          <LineChart/> 
          <p>Visualize your income over time with interactive graphs and charts for better financial insights.</p>
        </div>

        {/* Card-3 */}
        <div className="card">
          <h2>Weekly, monthly or yearly history</h2>
          <img className='imgOne' src="images/img-card3.jpg" alt="graph" />
          <p>Explore your financial history with weekly and monthly reports, helping you plan for the future.</p>
        </div>
      </main>
    </div>
  )
}
