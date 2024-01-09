export function reducer(state,action){
  switch(action.type){
    case "setUser":
        return {...state,user:action.payload}
    case "setExpenses":
      return {...state,expenses:action.payload} 
    case "setIsUpdateExpense":{
      return {...state,updateExpense:action.payload}
    } 
    case "setReciept":{
      return {...state,reciept:action.payload}
    }   
    case "setIsUploadImageSelect":{
    return {...state,isUploadImageSelect:action.payload}
    } 
    case "setExpensesFormData":{
      return {...state,isUploadImageSelect:action.payload}
      } 
    case "setEnteredIncomes" : {
      return {...state,enteredIncomes:action.payload}
    }
  }
}

export const initialState={
    user:null,
    expenses:null,
    isUpdateExpense:false,
    reciept:"images/no-image.jpg",
    isUploadImageSelect:false,
    enteredIncomes:[] 
}