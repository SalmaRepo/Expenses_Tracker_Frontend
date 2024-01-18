import React from 'react'
import { Bar } from "react-chartjs-2";
function BarIncWeekGraph({chartData,weekStart,weekLast}) {
  return (
    <div className="chart-container">
          <Bar
          style={{height:"16rem",width:"100%"}}
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: `Incomes of ${new Date(
                    weekStart
                  ).toLocaleDateString()} - ${new Date(
                    weekLast
                  ).toLocaleDateString()}`
                },
                legend: {
                  display: true
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

export default BarIncWeekGraph