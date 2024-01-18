import React, { useContext, useEffect, useState } from "react";
import { context } from "../../../../context/context";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BarIncWeekGraph from "./BarIncWeekGraph";
Chart.register(CategoryScale);


function HistoryIncWeekGraph({weekStart,weekLast}) {
  const { state, dispatch } = useContext(context);
 const incomesSummary = [];
  let addedCategories = {};
 const weeklyIncomes= state.user?.incomes?.filter(
    (inc) =>
    new Date(inc.date).getDate() >= new Date(weekStart).getDate() &&
    new Date(inc.date).getDate() <= new Date(weekLast).getDate()
  );

 /*  console.log(monthlyExpenses); */

 weeklyIncomes?.map((inc) => {
    const { amount, category } = inc;
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
  /* console.log(expensesSummary); */

  const [chartData, setChartData] = useState({
    labels: incomesSummary?.map(
      (income) =>
      income?.category?.charAt(0).toUpperCase() + income?.category.slice(1)
    ),
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
      labels: incomesSummary?.map((income) => income?.category),
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
  }, [weekStart,weekLast,state.user]);
  return (
    <div>
        <BarIncWeekGraph chartData={chartData} weekLast={weekLast} weekStart={weekStart}/>
    </div>
  )
}

export default HistoryIncWeekGraph