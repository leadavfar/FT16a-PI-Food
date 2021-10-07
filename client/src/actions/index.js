import axios from "axios";

export function getRecipes(){
    return async function(dispatch){
        var json= await axios.get('http://localhost:3001/recipes',{
        });
        
        return dispatch({
        type: "GET_RECIPES",
        payload: json.data
        });
    };
};

export function getDiets(){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/types",{
        });

        return dispatch ({
        type: "GET_DIETS",
        payload: json.data
        })
    }
}

export function getRecipeTitle(title){
    return async function (dispatch){
        try {
            var json = await axios.get("http://localhost:3001/recipes?title=" + title);
            return dispatch ({
                type: "GET_RECIPE_TITLE",
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export function postRecipe(payload){
    return async function (){
        const response= await axios.post("http://localhost:3001/post", payload);
        return response;
    }
}

export function filterRecipesByDiet(payload){
    return {
        type: "FILTER_BY_DIET",
        payload
    };
};

export function filterByOrigin(payload){
    return {
        type: "FILTER_BY_ORIGIN",
        payload
    };
};

export function orderByName(payload){
    return{
        type: "ORDER_BY_NAME",
        payload
    };
};

export function orderByPrice(payload){
    return{
        type: "ORDER_BY_PRICE",
        payload
    };
};

export function getRecipeDetail(id){
    return async function (dispatch){
        try{
            var json= await axios.get("http://localhost:3001/recipes/" + id);
            console.log(json.data)
            return dispatch({
                type: "GET_RECIPE_DETAIL",
                payload: json.data
            })
        } catch(error){
            console.log(error)
        }
    }
}