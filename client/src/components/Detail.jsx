import React from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail } from "../actions/index.js";
import { useEffect } from "react";
import Styles from "./Detail.module.css"

export default function Detail(props){
    const dispatch= useDispatch()

    useEffect(()=> {
        console.log(props);
        dispatch(getRecipeDetail(props.match.params.id));
    },[dispatch])

    const MyRecipe= useSelector ((state)=> state.detail)

    return (
        <div>
            {
                MyRecipe.length>0 ?
                <div >
                    <h1>{MyRecipe[0].title}</h1>
                    {/* <img src= {MyRecipe[0].image} alt= "https://www.icex.es/icex/wcm/idc/groups/public/documents/imagen/mde5/odew/~edisp/img2019810787.jpg" width="600px" height="400px"/> */}
                    <img src= {!MyRecipe[0].image ? "https://media.istockphoto.com/photos/fresh-vegetables-and-herbs-picture-id879709748?k=20&m=879709748&s=612x612&w=0&h=R3yuolequVG2OHVUvWolOH8qB6snhuBtt6hAg1aVqug=" : MyRecipe[0].image }alt= "image not found" width="450px" height="300px"/>
                    <h3>Spoonacular Score: {MyRecipe[0].spoonacularScore} - Health Score: {MyRecipe[0].healthScore}</h3>
                    <h3></h3>
                    <p className= {Styles.detail} dangerouslySetInnerHTML={{ __html: MyRecipe[0].summary }} />
                    <h3> <b>Diets: </b>{!MyRecipe[0].createdInDb? MyRecipe[0].diets + " ": MyRecipe[0].diets.map(el=> el.name + " ")}</h3>
                    <h2/>
                    <h2>STEPS</h2>
                    <ol className= {Styles.detail}>
                    {MyRecipe[0].steps.map(el=><li>{el}</li>)}
                    </ol>
                </div> 
                        : 
                        <div>
                            <h1>Loading...</h1>
                            </div>
            }
            <Link to= "/home">
                <button>Back</button>
            </Link>
        </div>
    )
}