export function reducer(state,action){
  switch(action.type){
    case "setUser":
        return {...state,user:action.payload}
    case "setExpenses":
      return {...state,expenses:action.payload} 
    case "setUpdateExpense":{
      return {...state,updateExpense:action.payload}
    } 
    case "setReciept":{
      return {...state,reciept:action.payload}
    }    
  }
}

export const initialState={
    user:null,
    expenses:null,
    updateExpense:false,
    reciept:"",
}