import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/images/logoLettresEnLumieres.png';
import { GrFormClose } from "react-icons/gr";
import Auth from "../hooks/useAuth";
import { useUser } from "../contexts/UserContext";

const Login = () =>{

    const navigate = useNavigate();
    const { user, setUser } = useUser();
    const [data, setData] = useState({
        user_name:'',
        user_password:''
    });

    const [formErrors, setFormErrors] = useState(false);


    const handleSubmit = async(evt) =>{
        evt.preventDefault();
    
        try{
   
            const response = await Auth.login(data.user_name, data.user_password);
            console.log(response, 'response');

            if (response){

                setUser({ id: response.id, name: response.user_name });
                console.log('username', response.user_name);
                sessionStorage.setItem('user_id', response.id);
                sessionStorage.setItem('user_name', response.user_name);

                setTimeout(()=>{
                    navigate('/home');
                }, 1000)
              
            }else{
                setFormErrors(true)
            }
           

        }catch(error){
           console.error(error);
            
        }
       
    }

  
    return <div className="login">
        <Link to={"/"} className="bouton__croix">
                            <p style={{ color: "#000" }}>QUITTER </p>
                            <p><span className="close-icon">&times;</span></p>
                        </Link>
        
        <div>
            <img src={logo} alt="Logo" className="login__logo"/>
           
            {formErrors && <p className="login__error">Identifiants incorrects, veuillez recommencer</p>}
            <form action="" className="form" method="POST" onSubmit={handleSubmit}>
                <div className="form__group">
                    <label className="form__label">Identifiant</label><br></br><br></br>
                    <input type="text" name="username" required placeholder="identifiant" className="form__input" onChange={(evt)=>setData({...data, user_name:evt.target.value})} />
                </div>

                <div className="form__group">
                    <label className="form__label">Mot de passe</label><br></br><br></br>
                    <input type="password" name="password" required placeholder="Mot de passe" className="form__input" onChange={(evt)=>setData({...data, user_password:evt.target.value})}/>
                </div>
                <button type="submit" className="form__submit">
                    OK
                </button>
            </form>
        </div>
    </div>
}

export default Login;