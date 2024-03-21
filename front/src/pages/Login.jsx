import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/images/logo.png';
import { GrFormClose } from "react-icons/gr";
import Auth from "../hooks/useAuth";

const Login = () =>{

    const navigate = useNavigate();
    const [user, setUser] = useState({
        user_name:'',
        user_password:''
    });

    const [formErrors, setFormErrors] = useState("");

    // useEffect(() => {
    //     if(localStorage.getItem('user_id')){
    //         navigate('/home');
    //     }
    // })
 
    
    const handleSubmit = async(evt) =>{
        evt.preventDefault();
      
        try{
            const response = await Auth.login(user);
            if (response){
                navigate('/home');
            }
            localStorage.setItem('user_id', response.user_id);
            localStorage.setItem('user_name', response.user_name);

        }catch(error){
            setFormErrors('Combinaison usename - Password incorrecte');
            
        }
       
    }

  
    return <div className="login">
        <Link to="/"><p className="login__quit">Quitter <GrFormClose size={32}/></p></Link>
        
        <div>
            <img src={logo} alt="Logo" className="login__logo"/>
           
            <form action="" className="form" method="POST" onSubmit={handleSubmit}>
                <div className="form__group">
                    <label className="form__label">Identifiant</label><br></br><br></br>
                    <input type="text" name="username" required placeholder="identifiant" className="form__input" onChange={(evt)=>setUser({...user, user_name:evt.target.value})} />
                </div>

                <div className="form__group">
                    <label className="form__label">Mot de passe</label><br></br><br></br>
                    <input type="password" name="password" required placeholder="Mot de passe" className="form__input" onChange={(evt)=>setUser({...user, user_password:evt.target.value})}/>
                </div>
                <button type="submit" className="form__submit">
                    OK
                </button>
            </form>
        </div>
    </div>
}

export default Login;