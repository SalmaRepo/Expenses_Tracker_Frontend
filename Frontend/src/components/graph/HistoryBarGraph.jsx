import React, { useContext } from "react";
import { context } from "../../context/context";
import HistoryDayGraph from "./HistoryDayGraph";
import HistoryMonthGraph from "./HistoryMonthGraph";
import HistoryWeekGraph from "./HistoryWeekGraph";
import HistoryYearGraph from "./HistoryYearGraph";

function HistoryBarGraph({ selectedDuration, year, month, day,weekStart,weekLast }) {
  const { state, dispatch } = useContext(context);
  /*  console.log(state.user?.expenses) */

  return (
    <div>
      {selectedDuration === "year" && <HistoryYearGraph year={year} />}
      {selectedDuration === "month" && (
        <HistoryMonthGraph month={month} year={year} />
      )}
      {selectedDuration === "day" && (
        <HistoryDayGraph day={day} month={month} year={year} />
      )}
      {selectedDuration === "week" && (
        <HistoryWeekGraph weekStart={weekStart} weekLast={weekLast}  />
      )}
    </div>
  );
}

export default HistoryBarGraph;
