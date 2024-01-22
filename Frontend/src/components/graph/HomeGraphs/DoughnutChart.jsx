import { Doughnut } from "react-chartjs-2";
import './homegraph.css'

export const DoughnutChart = ({ chartData }) => {
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
    <div className="home-chart-container">
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
              
             
              /* text: 
                (`Your Expenses according to category for the month of ${
                  months[new Date().getMonth()]
                } ${new Date().getFullYear()}`),
               */
             
            },
            legend: {
              display: true,
              maxWidth:10,

              labels:{
                font: {
                  size: 10,
                  
                  
                  
              },
              color:"#101011",
              },
              position:"bottom",
              align:"center",

            },
          },
        }}
      />
    </div>
  );
};
