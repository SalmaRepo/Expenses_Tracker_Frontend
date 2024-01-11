import React, { useContext, useEffect } from "react";
import BASE_URL from "../../config/urlConfig";
import { context } from "../../context/context";
import "./showExpenses.css";
import toast, { Toaster } from "react-hot-toast"

function ShowExpenses({expenses,setExpenses}) {
  const { state, dispatch } = useContext(context);
  const curr=state.user?.currency?.slice(3)+"s"

  //console.log(state.expenses);
  //console.log(state.user);
  //console.log(expenses)

  const getExpenseByUser=()=>{
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/api/expenses/getExpensesByUser`, {
      method: "GET",
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((result) => dispatch({ type: "setExpenses", payload: result.data }))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getExpenseByUser()
  },[]);

  const deleteExpense=(id)=>{
   const token=localStorage.getItem("token");
   if(id){
    fetch(`${BASE_URL}/api/expenses/delteExpense/${id}`,{
      method: "DELETE",
        headers: {
          token: token,
        },
        
      body:JSON.stringify({userId:state.user?._id}) 
     }).then(res=>res.json())
     .then(result=>{
      toast.success("expenses Deleted")
      console.log(state.user)})
     .catch(err=>console.log(err))
   }

   getExpenseByUser()
   
  }

  const editExpense=(id)=>{
    toast.error("Click on delete to edit")

    //willbe handled later
    /* const token=localStorage.getItem("token");
   
   if(id){
    fetch(`${BASE_URL}/api/expenses/updateExpense/${id}`,{
      method: "PATCH",
        headers: {
          token: token,
        },
        
      body:JSON.stringify(expenses) 
     }).then(res=>res.json())
     .then(result=>{
      
      console.log(result.data)})
     .catch(err=>console.log(err))
   } */

  }



  return (
    <div>
       <Toaster position="top-center" />
      <div className="showExpenses">
        <h3>Category</h3>
        <h3>Amount</h3>
        <h3>Time</h3>
      </div>
      {state.expenses
        ? state.expenses?.map((expense) => {
            return (
              <div key={expense?._id} className="showExpenses">
                <p>{expense?.category?.charAt(0)?.toUpperCase()+expense?.category?.slice(1)}</p>
                <p>{expense?.amount}<span>{curr}</span></p>
                <p>{new Date(expense?.date).toLocaleString()}</p>
                <button type="button" onClick={()=>deleteExpense(expense?._id)}>Delete</button>
                <button type="button" onClick={()=>editExpense(expense?._id)}>Edit</button>
              </div>
            );
          }).reverse()
        : state.user?.expenses?.map((expense) => {
            return (
              <div key={expense._id} className="showExpenses">
                <p>{expense?.category?.charAt(0)?.toUpperCase()+expense?.category?.slice(1)}</p>
                <p>{expense?.amount}<span>{curr}</span></p>
                <p>{new Date(expense?.date).toLocaleString()}</p>
                <button>Delete</button>
                <button>Edit</button>
              </div>
            );
          }).reverse()}
    </div>
  );
}

export default ShowExpenses;
