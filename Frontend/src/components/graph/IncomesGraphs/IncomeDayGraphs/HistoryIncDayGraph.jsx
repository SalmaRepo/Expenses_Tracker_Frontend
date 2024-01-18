import React, { useContext, useState, useEffect } from "react";
import { context } from "../../../../context/context";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BarIncDayGraph from "./BarIncDayGraph";

Chart.register(CategoryScale);

function HistoryIncDayGraph({ day, month, year }) {
 /*  console.log(day); */
  const { state, dispatch } = useContext(context);
  const incomesSummary = [];
  let addedCategories = {};

  const dayIncomes = state.user?.incomes?.filter(
    (income) =>
      new Date(income.date).getDate() === new Date(day).getDate() &&
      new Date(income.date).getMonth() === month &&
      new Date(income.date).getFullYear() === year
  );

 /*  console.log(dayIncomes); */

  dayIncomes?.map((income) => {
    const { amount, category } = income;
   /*  console.log(amount) */
    if (addedCategories[category]) {
      addedCategories[category] += amount;
    } else {
      addedCategories[category] = amount;
    }
  });

  /* console.log(addedCategories); */

  for (const category in addedCategories) {
    incomesSummary.push({ category, amount: addedCategories[category] });
  }
  /*  console.log(incomesSummary);  */

  const [chartData, setChartData] = useState({
    labels: incomesSummary?incomesSummary.map((income) => income?.category):[],
    datasets: [
      {
        label: "Amount Spent ",
        data: incomesSummary?.map((income) => income?.amount),
        backgroundColor: ["#3e47ed", "#e49ec3", "#f3ba2f", "#2a71d0"],
        borderColor: "black",
        borderWidth: 0,
        barThickness: 30,
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: incomesSummary?incomesSummary.map((income) => income?.category):[],
      datasets: [
        {
          label: "Amount Spent ",
          data: incomesSummary?.map((income) => income?.amount),
          backgroundColor: [
            "#2a71d0",
            "#35d02a",
            "#d02aa9",
            "#d0a12a",
            "#d02a3b",
            "#2ad0cb",
            "#97dd73",
          ],
          borderColor: "black",
          borderWidth: 0,
        },
      ],
    });

    /* console.log(chartData) */
  }, [day,state.user]);

/* console.log(chartData) */
  return (
    <div>
      <BarIncDayGraph chartData={chartData} day={day}/>
    </div>
  );
}

export default HistoryIncDayGraph