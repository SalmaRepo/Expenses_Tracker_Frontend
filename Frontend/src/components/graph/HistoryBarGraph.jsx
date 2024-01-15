import React, { useContext } from 'react'
import { context } from '../../context/context'
import HistoryMonthGraph from './HistoryMonthGraph'
import HistoryYearGraph from './HistoryYearGraph'

function HistoryBarGraph({selectedDuration,year,month}) {
    const {state,dispatch}=useContext(context)
   /*  console.log(state.user?.expenses) */
   
  return (
    <div>
        {selectedDuration==="year"&&<HistoryYearGraph year={year}/>}
        {selectedDuration==="month"&&<HistoryMonthGraph month={month} year={year}/>}
    </div>
  )
}

export default HistoryBarGraph