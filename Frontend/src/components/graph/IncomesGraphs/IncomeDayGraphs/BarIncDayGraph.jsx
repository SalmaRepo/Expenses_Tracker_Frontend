import React from 'react'
import { Bar } from "react-chartjs-2";


function BarIncDayGraph({ chartData, day}) {
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
        style={{ height: "16rem", width: "100%" }}
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Incomes of ${new Date(day).getDate()} ${
                months[new Date(day).getMonth()]
              } ${new Date(day).getFullYear()}`,
            },
            legend: {
              display: true,
            },
          },
          layout: {
            padding: {
              x: 20,
            },
          },
        }}
      />
    </div>
  );
}

export default BarIncDayGraph