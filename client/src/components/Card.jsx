import React from "react";
import Styles from "./Card.module.css";

export default function Card({title, /* summary, */ image, price}){
    return (
        <div className={Styles.card}>
            <h5>{title}</h5>
            {/* <p dangerouslySetInnerHTML={{ __html: summary }} /> */}
            {/* <img src={image} alt= "img not found" width="300px" height="200px"/> */}
            <img src= {!image ? "https://media.istockphoto.com/photos/fresh-vegetables-and-herbs-picture-id879709748?k=20&m=879709748&s=612x612&w=0&h=R3yuolequVG2OHVUvWolOH8qB6snhuBtt6hAg1aVqug=" : 
            image} alt= "image not found" width="300px" height="200px"/>
            <p>${price}</p>
        </div>
    );
};