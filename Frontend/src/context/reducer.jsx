export default function reducer(state,action){
  switch(action.type){
    case "setUser":
        return {user:action.payload}
  }
}

export const initialState={
    user:null,

}