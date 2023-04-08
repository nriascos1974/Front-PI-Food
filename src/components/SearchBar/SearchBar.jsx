import React from "react";
import {useState} from 'react';
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import styles from './SearchBar.module.css'



export default function SearchBar () {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }
    
    function handleSubmit(e){
        e.preventDefault()
        dispatch(actions.getRecipesName(name))
    }

    return (
        <div >
            <input id="inputSearch" className={styles.inputSearch}
            type= 'text' 
            placeholder="Search for a recipe" 
            onChange={(e) => handleInputChange(e)} />

            <button className={styles.SeachButton}
            type="submit" 
            onClick={(e)=>handleSubmit(e)}>Search</button>
        </div>
    )

}