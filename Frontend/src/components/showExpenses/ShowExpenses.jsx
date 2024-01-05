import React, { useContext,useEffect } from 'react'
import BASE_URL from '../../config/urlConfig'
import { context } from '../../context/context'
import "./showExpenses.css"

function ShowExpenses() {
  const {state,dispatch}=useContext(context)

  console.log(state.expenses)
  console.log(state.user)
  return (
    <div>
      <div className="showExpenses">
        <h3>Category</h3>
        <h3>Amount</h3>
        <h3>Time</h3>
      </div>
    {state.expenses?state.expenses?.map(expense=>{
        return(
            <div key={expense._id} className="showExpenses">
             <p>{expense.category}</p>
             <p>{expense.amount}</p>
             <p>{expense.date}</p>
           
            </div>
        )
    }):state.user?.expenses?.map(expense=>{
      return(
          <div key={expense._id} className="showExpenses">
           <p>{expense.category}</p>
           <p>{expense.amount}</p>
           <p>{expense.date}</p> 
          </div>
      )
  })}
    </div>
  )
}

export default ShowExpenses