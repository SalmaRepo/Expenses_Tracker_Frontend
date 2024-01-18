import React from 'react'
import { Line } from "react-chartjs-2";

function LineIncYearGraph({chartData,year}) {
  return (
    <div className="chart-container">
          <Line
          style={{height:"16rem",width:"100%"}}
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: `Incomes of ${year}`
                },
                legend: {
                  display: false
                },
                
              },
              animations: {
                tension: {
                  duration: 1500,
                  easing: 'linear',
                  from: 1,
                  to: 0,
                  loop: true
                }
              },
              layout:{
                padding:{
                  x:20
                }
              }

            }}
          />
        </div>
  )
}

export default LineIncYearGraph