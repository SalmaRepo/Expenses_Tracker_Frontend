import React from 'react'
import "./about.css"

import LineChart from '../graph/lineChart';

export default function About() {
  return (
    <div id='about' className='about-container'>
      <div className='headline'>
        <h1 className='first-line'>Why Should You</h1>
        <h2 className='second-line'>Use Our Expenses App?</h2>
      </div>
      <p>
      We’ll give you 3 very good reasons…
      </p>
       
      <div className="offer-cards">
        
        {/* Card-1 */}
        <div className="offer-card">
          <h2>Track your Expenses</h2>
          <img className='imgOne' src="images/alexander-mils-lCPhGxs7pww-unsplash.jpg" alt="holding money"/>
          <p>You can track and manage your expenses with ease using our expense tracking app.</p>
        </div>

        {/* Card-2 */}
        <div className="offer-card">
          <h2>Track Income with Graphs</h2>
          <LineChart /> 
          <p>Visualize your income over time with interactive graphs and charts for better financial insights.</p>
        </div>

        {/* Card-3 */}
        <div className="offer-card">
          <h2>Weekly/Monthly History</h2>
          <img className='imgOne' src="images/imgTwo.jpg" alt="graph" />
          <p>Explore your financial history with weekly and monthly reports, helping you plan for the future.</p>
        </div>
      </div>
    </div>
  )
}
