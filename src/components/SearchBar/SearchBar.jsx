import React from "react";
import {useState} from 'react';
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import styles from './SearchBar.module.css'



export default function SearchBar () {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        setName(e.target.value)
    }
    
    function handleSubmit(e){
        dispatch(actions.getRecipesName(name))
    }

    return (
        <div >
            <input id="inputSearch" className={styles.inputSearch}
            type= 'text' 
            placeholder="Search for a recipe" 
            onChange={handleInputChange} />

            <button className={styles.SeachButton}
            type="button" 
            onClick={handleSubmit}>Search</button>
        </div>
    )

}