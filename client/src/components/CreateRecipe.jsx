import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {postRecipe, getDiets} from "../actions/index.js";
import {useDispatch, useSelector} from "react-redux";

import Styles from "./CreateRecipe.module.css"

function validate(input){
    let errors= {};
    if (!input.title){
        errors.title= "Title is required";
    } else if (!input.summary){
        errors.summary = "Summary is required";
    }
    return errors;
};

export default function CreateRecipe(){
    const history= useHistory();
    const dispatch= useDispatch();
    const diets= useSelector((state)=> state.diets)
    const [errors, setErrors]= useState({});

    const [input, setInput]= useState({
        title:"",
        summary:"",
        image:"",
        spoonacularScore:"",
        healthScore:"",
        steps:[],
        price:"",
        diets:[]
    });

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
    }));
}

    function handleDelete(el){
        setInput({
            ...input,
            diets: input.diets.filter(occ=> occ !== el)
        })
    }

    function handleSelect(e){
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault(e);
        dispatch(postRecipe(input))
        alert("¡RECIPE CREATED!")
        setInput({
            title:"",
            summary:"",
            image:"",
            spoonacularScore:"",
            healthScore:"",
            steps:[],
            price:"",
            diets:[]
        })
        history.push("/home")
    }

    useEffect(()=> {
    dispatch(getDiets());
    }, []);

    return(
        <div className={Styles.div}>
            <h1>Create Your Custom Recipe</h1>
            <form onSubmit= {(e)=> handleSubmit(e)}>
                <div>
                    <label>Title: </label>
                    <input
                    className={Styles.input}
                    type="text"
                    value= {input.title}
                    name= "title"
                    required= "true"
                    onChange= {(e)=> handleChange(e)}
                    />
                    {errors.title && (
                        <p className= "error">{errors.title} </p>
                    )}
                </div>

                <div>
                    <label>Summary: </label>
                    <input
                    className={Styles.input}
                    type="text"
                    value= {input.summary}
                    name= "summary"
                    required= "true"
                    onChange= {(e)=> handleChange(e)}
                    />
                     {errors.summary && (
                        <p className= "error">{errors.summary} </p>
                    )}
                </div>

                <div>
                    <label>Image: </label>
                    <input
                    className={Styles.input}
                    type="text"
                    value= {input.image}
                    name= "image"
                    onChange= {(e)=> handleChange(e)}
                    />
                </div>

                <div>
                    <label>Spoonacular Score: </label>
                    <input
                    className={Styles.input}
                    type="number"
                    value= {input.spoonacularScore}
                    name= "spoonacularScore"
                    onChange= {(e)=> handleChange(e)}
                    />
                </div>

                <div>
                    <label>Health Score: </label>
                    <input
                    className={Styles.input}
                    type="number"
                    value= {input.healthScore}
                    name= "healthScore"
                    onChange= {(e)=> handleChange(e)}
                    />
                </div>

                {/* <div>
                    <label>Steps: </label>
                    <input
                    className={Styles.input}
                    type="text"
                    value= {input.steps}
                    name= "steps"
                    onChange= {(e)=> handleChange(e)}
                    />
                </div> */}

                {/* <div>
                    <label>Price: </label>
                    <input
                    className={Styles.input}
                    type="number"
                    value= {input.price}
                    name= "price"
                    onChange= {(e)=> handleChange(e)}
                    />
                </div> */}

                <select className={Styles.select} onChange={(e)=> handleSelect(e)}>
                    {diets.map((el)=> (
                        <option value= {el.name}>{el.name}</option>
                    ))}
                </select>
                <ul><li>{input.diets.map(el=> el + " ,")}</li></ul>
                <button className={Styles.button} type= "submit">Create Recipe</button>
                <Link to= "/home"><button>Back</button></Link>
            </form>

            {input.diets.map(el=> 
                <div>
                    <p>{el}</p>
                    <button className={Styles.button} onClick= {()=> handleDelete(el)}>x</button>
                </div>)}
        </div>
    )
}