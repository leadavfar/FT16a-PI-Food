import React from "react";
import {Link} from "react-router-dom";
import Styles from "./LandingPage.module.css"

export default function LandingPage(){
    return (
        <div className= {Styles.landing}>
            <h1>Welcome to the Food Page</h1>
            <Link to= "/home">
                <button>Ingresar</button>
            </Link>
        </div>
    );
};