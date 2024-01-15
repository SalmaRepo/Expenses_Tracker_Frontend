import { Doughnut } from "react-chartjs-2";

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
    <div className="chart-container" style={{ width: "30%" }}>
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Your Expenses according to category for the month of ${
                months[new Date().getMonth()]
              } ${new Date().getFullYear()}`,
            },
            legend: {
              display: true,
            },
          },
        }}
      />
    </div>
  );
};
