import React from "react";

import Styles from "./Paged.module.css"

export default function Paged({recipesPerPage, allRecipes, paged}){
    const pageNumber= [];

    for (let i=0;   i<=Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumber.push(i+1);
    };

    return (
        <div className= {Styles.paged}>
            <ul>
                {pageNumber &&
                pageNumber.map(number=> (
                    <li className= "number" key= {number}>
                    <a onClick= {()=> paged(number)}> {number} </a>
                    </li>
                ))};
            </ul>
        </div>
    );
};