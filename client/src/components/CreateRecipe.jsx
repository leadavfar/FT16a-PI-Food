import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {postRecipe, getDiets} from "../actions/index.js";
import {useDispatch, useSelector} from "react-redux";

import Styles from "./CreateRecipe.module.css"

function validate(input){
    let errors= {};
    if (!input.title){
        errors.title= "Se requiere un titulo para la receta";
    } else if (!input.summary){
        errors.summary = "Se requiere un resumen de la receta"
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

/*     function handleCheck(e){
        if (e.target.checked){
            setInput({
                ...input,
                status: e.target.value
            })
        }
    } */

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
                    onChange= {(e)=> handleChange(e)}
                    />
                    {errors.title && (
                        <p className= "error">{errors.title} </p>
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

{/*                 <div>
                    <label>Diets</label>
                    <label><input
                    type="checkbox"
                    value= "vegan"
                    name= "vegan"
                    onChange= {(e)=> handleCheck(e)}
                    />Vegan</label>
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
                <div className= "divOcc">
                    <p>{el}</p>
                    <button className={Styles.button} className= "botonX" onClick= {()=> handleDelete(el)}>x</button>
                </div>)}
        </div>
    )
}