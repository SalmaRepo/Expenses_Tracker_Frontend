import React from "react"; // Importing the React library

//import Chart from "chart.js/auto"; // Importing the Chart.js library

import { Line } from "react-chartjs-2"; // Importing the Line component from the react-chartjs-2 library

// Setting up the labels for the x-axis of the chart
const labels = ["January", "February", "March", "April", "May", "June"];

// Setting up the data for the chart, including the labels and datasets
const data = {
  labels: labels,
  datasets: [
    {
      label: "Expenses for the year", // Setting up the label for the dataset      
      backgroundColor: "rgb(0, 255, 255)", // Setting up the background color for the dataset
      borderColor: "rgb(0, 255, 255))", // Setting up the border color for the dataset
      data: [0, 1000, 5, 450, 5, 700, 45], // Setting up the data for the dataset
    },
  ],
};

// Defining the LineChart component
const LineChart = () => {
  return (
    <div className="graph-container">
      <Line data={data} /> 
    </div>
  );
};

export default LineChart; // Exporting the LineChart component as the default export of the module
