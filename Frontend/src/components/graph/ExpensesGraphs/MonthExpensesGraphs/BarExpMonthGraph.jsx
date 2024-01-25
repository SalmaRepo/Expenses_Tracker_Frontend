import React from 'react'
import { Bar } from "react-chartjs-2";
import '../../barChartStyle.css'
function BarExpMonthChart({chartData,month,year}) {
/*     console.log(year) */

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
    return (
        <div className="chart-container">
          <Bar
            className='barChart'
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: `Expenses of ${months[month]} ${year}`
                },
                legend: {
                  display: false
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
      );
}

export default BarExpMonthChart