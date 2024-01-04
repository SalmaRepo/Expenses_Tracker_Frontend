export function reducer(state,action){
  switch(action.type){
    case "setUser":
        return {user:action.payload}
    case "setExpenses":
      return {...state,expenses:action.payload}    
  }
}

export const initialState={
    user:null,
    expenses:null
}