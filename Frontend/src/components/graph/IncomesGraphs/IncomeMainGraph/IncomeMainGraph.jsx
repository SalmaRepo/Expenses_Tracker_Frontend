import React, { useContext } from "react";
import { context } from "../../../../context/context";
import HistoryIncDayGraph from "../IncomeDayGraphs/HistoryIncDayGraph";
import HistoryIncMonthGraph from "../IncomeMonthGraphs/HistoryIncMonthGraph";
import HistoryIncWeekGraph from "../IncomeWeekGraphs/HistoryIncWeekGraph";
import HistoryIncYearGraph from "../IncomeYearGraphs/HistoryIncYearGraph";

function IncomeMainGraph({
  selectedDuration,
  year,
  month,
  day,
  weekStart,
  weekLast,
}) {
  const { state, dispatch } = useContext(context);
  /*  console.log(state.user?.expenses) */

  return (
    <div>
      {selectedDuration === "year" && <HistoryIncYearGraph year={year} />}
      {selectedDuration === "month" && (
        <HistoryIncMonthGraph month={month} year={year} />
      )}
      {selectedDuration === "day" && (
        <HistoryIncDayGraph day={day} month={month} year={year} />
      )}
      {selectedDuration === "week" && (
        <HistoryIncWeekGraph weekStart={weekStart} weekLast={weekLast} />
      )}
    </div>
  );
}

export default IncomeMainGraph;