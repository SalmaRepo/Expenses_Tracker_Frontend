import { Doughnut } from "react-chartjs-2";

export const DoughnutChart = ({ chartData }) => {
  return (
    <div className="chart-container" style={{width:"30%"}}>
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Your Expenses according to category"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};