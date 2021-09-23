const initialState= {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: []
}

function rootReducer(state= initialState, action) {
    switch(action.type){
        case "GET_RECIPES":
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }

        case "GET_DIETS":
            return {
                ...state,
                diets: action.payload,
            }

        case "GET_RECIPE_DETAIL":
            return {
                    ...state,
                    detail: action.payload
                }

        case "GET_RECIPE_TITLE":
            return {
                ...state,
                recipes: action.payload
            }

        case "POST_RECIPE":
            return {
                ...state,
            }

        case "FILTER_BY_DIET":
            const allRecipes= state.allRecipes;
            const dietFiltered= action.payload === "All" ? allRecipes : allRecipes.filter(el=> el.diets.find(el=> el === action.payload));
            return{
                ...state,
                recipes: dietFiltered
            }

            case "FILTER_BY_ORIGIN":
                const originFilter= action.payload === "Api" ? state.allRecipes.filter(el=> el.createdInDb) : state.allRecipes.filter(el=> !el.createdInDb);
                return{
                    ...state,
                    recipes: action.payload === "All" ? state.allRecipes : originFilter
                }

            case "ORDER_BY_PRICE":
                let sortedArrPrice= action.payload === "high"?
                state.recipes.sort(function(a, b){
                    if (a.price > b.price){
                        return 1;
                    }
                    if (b.price > a.price){
                        return -1;
                    }
                    return 0;
                }):
                state.recipes.sort(function(a,b){
                    if (a.price > b.price){
                        return -1;
                    }
                    if (b.price > a.price){
                        return 1;
                    }
                    return 0;
                  })
                return {
                    ...state,
                    recipes: sortedArrPrice
                };


            case "ORDER_BY_NAME":
                let sortedArr= action.payload === "asc"?
                state.recipes.sort(function(a, b){
                    if (a.title > b.title){
                        return 1;
                    }
                    if (b.title > a.title){
                        return -1;
                    }
                    return 0;
                }):
                state.recipes.sort(function(a,b){
                    if (a.title > b.title){
                        return -1;
                    }
                    if (b.title > a.title){
                        return 1;
                    }
                    return 0;
                  })
                return {
                    ...state,
                    recipes: sortedArr
                };

        default: 
            return state;
    }
}

export default rootReducer;