import React, { useEffect, useState } from "react"
import logo from '../assets/images/logo.svg'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CircleLoader } from "react-spinners";

const Home = () => {

    const [state, setState] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (state === "identifie" || state === "libre") {
            setLoading(true);
            setTimeout(() => {
                navigate((state === 'identifie') ?'login' : 'home')
            }, 2000)
        }
    }, [state])
  
  
    return (<div className="home">
                {loading ? 
                    <CircleLoader color="#36d7b7" size={180}/>
                    : 
                    <React.Fragment>
                        <img src={logo} alt="logo" className="home__logo"/>
                        <select name="state" id="" onChange={(evt)=>setState(evt.target.value)} className="home__selection">
                            <option value="" >Mode</option>
                            <option value="identifie">Identifié</option>
                            <option value="libre">Libre</option>
                        </select>
                        <p className="home__credits">
                            <Link to="/credits">
                                Credits
                            </Link>
                        </p>
                        
                        
                    </React.Fragment>
                }
    </div>)
}

export default Home;