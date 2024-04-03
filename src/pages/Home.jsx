import React, { useEffect, useState } from "react"
import logo from '../assets/images/logoLettresEnLumieres.png'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select, duration } from "@mui/material";
import { CircleLoader } from "react-spinners";
import { motion } from "framer-motion";

const Home = (props) => {
    const {forceUpdate} = props;
    const [state, setState] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (state === "identifie" || state === "libre") {
            setLoading(true);
            forceUpdate();
            setTimeout(() => {
                navigate((state === 'identifie') ?'login' : 'home')
            }, 1000)
        }
    }, [state])
  
    return (
        <div className="home">
            {loading ? (
                <CircleLoader color="#36d7b7" size={180}/>
            ) : (
                <React.Fragment>
                    <motion.img 
                        src={logo} 
                        alt="logo" 
                        className="home__logo"
                        initial={{ y: -100, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        transition={{duration:1}}
                    />
                    <motion.select 
                        name="state" 
                        id="" 
                        onChange={(evt)=>setState(evt.target.value)} 
                        className="home__selection"
                        initial={{ y: 100, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }} 
                        transition={{duration:1}}
                    >
                        <option value="" >Mode</option>
                        <option value="identifie">Identifié</option>
                        <option value="libre">Libre</option>
                    </motion.select>
                    <p className="home__credits">
                        <Link to="/credits">
                            Credits
                        </Link>
                    </p>
                </React.Fragment>
            )}
        </div>
    );
}

export default Home;
