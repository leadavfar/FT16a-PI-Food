import React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {getRecipeTitle} from "../actions/index.js"

import Styles from "./SearchBar.module.css";

export default function SearchBar(){
    const dispatch= useDispatch()
    const [title, setTitle]= useState("")

    function handleInputChange(e){
        e.preventDefault()
        setTitle(e.target.value)
    };

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getRecipeTitle(title))
    }

    return (
        <div className= {Styles.input}>
            <input
                type= "text"
                placeholder= "Search recipe..."
                onChange= {(e)=> handleInputChange(e)}
            />
            <button className= {Styles.button} type= "submit" onClick= {(e)=> handleSubmit(e)}>Search</button>
        </div>
    )
}