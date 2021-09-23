import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filterRecipesByDiet, getDiets, getRecipes, filterByOrigin, orderByName, orderByPrice} from "../actions";
import {Link} from "react-router-dom"
import Card from "./Card.jsx";
import Paged from "./Paged.jsx";
import SearchBar from "./SearchBar.jsx";

import Styles from "./Home.module.css";

export default function Home(){
    const allRecipes= useSelector((state)=> state.recipes);
    const allDiets= useSelector((state)=> state.diets);
    const dispatch= useDispatch();
    const [_order, setOrder]= useState('');
    const [currentPage, setCurrentPage]= useState(1);
    const [recipesPerPage, setRecipesPerPage]= useState(9);
    const indexOfLastRecipe= currentPage * recipesPerPage;
    const indexOfFirstRecipe= indexOfLastRecipe - recipesPerPage;
    const currentRecipes= allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe);
    
    const paged= (pageNumber)=> {
        setCurrentPage(pageNumber)
    };

    useEffect(()=> {
        dispatch(getDiets());
        },[dispatch]);

    useEffect (()=>{
        dispatch(getRecipes())
    },[dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes())
    };

    function handleFilterDiets(e){
        dispatch(filterRecipesByDiet(e.target.value))
    };

    function handleFilterOrigin(e){
        dispatch(filterByOrigin(e.target.value))
    };

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordered${e.target.value}`)
    };

    function handleSortPrice(e){
        e.preventDefault();
        dispatch(orderByPrice(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordered${e.target.value}`)
    };

    return(
        <div>
            <h1>THE FOOD PAGE</h1>
            <button className={Styles.button} onClick= {e=> handleClick(e)}>
                Reload All Recipes
            </button>
            <Link to= "/recipe"><button className={Styles.button}>Create Recipe</button></Link>
            <div>
                <select className={Styles.select} onChange= {e=> handleSort(e)}>
                    <option value= "asc">Ascending</option>
                    <option value= "desc">Descending</option>
                </select>

                <select className={Styles.select} onChange= {e=> handleSortPrice(e)}>
                    <option value= "high">Low Price</option>
                    <option value= "low">High Price</option>
                </select>

                <select className={Styles.select} onChange= {e=> handleFilterDiets(e)}>
                    <option value= "All">All</option>
                    {allDiets?.map((el)=> {
                        return(
                            <option value= {el.name}> {el.name} </option>
                        )
                    })}
                </select>

                <select className={Styles.select} onChange={e=> handleFilterOrigin(e)}>
                    <option value= "All">All</option>
                    <option value= "Api">Custom</option>
                    <option value= "DataBase">Spoonacular</option>
                </select>
                
                <SearchBar className={Styles.input}/>
                
                {currentRecipes?.map((el)=> {
                    return (
                        <div className= {Styles.cards}>
                            <Link to= {"/home/" + el.id}>
                                <Card title= {el.title} /* summary= {el.summary} */ image= {el.image} /* id= {el.id} */ price= {el.price}/>
                            </Link>
                        </div>
                    );
                    })};

                <Paged
                    recipesPerPage= {recipesPerPage}
                    allRecipes= {allRecipes.length}
                    paged= {paged}
                    />
            </div>
        </div>
    );
};