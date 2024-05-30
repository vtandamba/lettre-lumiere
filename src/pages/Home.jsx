import React, { useEffect, useState } from "react"
import logo from '../assets/images/logoLettresEnLumieres.png'
import { Link, useNavigate } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import { motion } from "framer-motion";
import { useUser } from "../contexts/UserContext";
import lockedIcon from "../assets/images/user-lock.svg";
import lockedOpenIcon from "../assets/images/user.svg"


const Home = (props) => {
    const [state, setState] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user, setUser } = useUser();
    
    useEffect(() => {
        if (state === "libre") {
            // Supprimer le sessionStorage donc le user s'il passe en mode libre
            sessionStorage.clear(); 
            setUser(null) //Envoyer l'information au context
            setLoading(true);
            setTimeout(() => {
                navigate('home');
            }, 1000);
        } else if (state === "identifie") {
            setLoading(true);
     
            setTimeout(() => {
                navigate('login');
            }, 1000);
        }
    }, [state, navigate]);
  
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

                    <motion.div
                            className="home__selection"
                            initial={{ y: 100, opacity: 0 }} 
                            animate={{ y: 0, opacity: 1 }} 
                            transition={{duration:1}}
                    >
                        <Link onClick={()=>setState('identifie')} className="home__link">
                            <p>Identifié</p>
                            <img src={lockedIcon} alt="Mode Identifié" />
                        </Link>
                        <Link onClick={()=>setState('libre')} className="home__link">
                            <p>Libre</p>
                            <img src={lockedOpenIcon} alt="Mode Libre" />
                        </Link>
                    </motion.div>
         
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
