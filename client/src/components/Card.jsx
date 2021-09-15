import React from "react";
import Styles from "./Card.module.css"

export default function Card({title, summary, image }){
    return (
        <div className={Styles.card}>
            <h5>{title}</h5>
            {/* <p dangerouslySetInnerHTML={{ __html: summary }} /> */}
            <img src={image} alt= "img not found" width="300px" height="200px"/>
        </div>
    );
};