const intial=[];

const recipesReducer=(state=intial,action)=>{

    switch(action.type)
    {
        case "SETTING_RECIPES": return state=[...action.payload];

      default: return state;
    } 
}


export default recipesReducer;