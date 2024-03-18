import React, { useState } from "react"
import logo from '../assets/images/logo.svg'
import { Navigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Home = () => {

    const [state, setState] = useState("");
    
  
    return (<div className="home">
                {state==='identifie' && <Navigate to="/login" replace />}
                {state === 'libre' && <Navigate to="/home" replace />}
                <img src={logo} alt="logo" className="home__logo"/>
                <select name="state" id="" onChange={(evt)=>setState(evt.target.value)} className="home__selection">
                    <option value="" >Mode</option>
                    <option value="identifie">Identifié</option>
                    <option value="libre">Libre</option>
                </select>
                {/* <FormControl >
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select 
                        sx={{
                            width: 400, 
                            fontSize: 40,
                            margin: '20px 0', // Ajoute une marge au-dessus et en dessous
                            color: 'primary.main', // Utilise la couleur principale du thème
                            "& .MuiSvgIcon-root": { // Cible spécifiquement l'icône du Select
                                fontSize: '2.5rem', // Ajuste la taille de l'icône
                            }
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state}
                        label="Mode"
                        className="home__selection"
                        onChange={(evt)=>setState(evt.target.value)} 
                    >
                        <MenuItem value="identifie">Identifié</MenuItem>
                        <MenuItem value="libre">Libre</MenuItem>
                      
                    </Select>
                    </FormControl> */}
    </div>)
}

export default Home;