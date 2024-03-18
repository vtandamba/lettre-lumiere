import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.png';
import { GrFormClose } from "react-icons/gr";

const Login = () =>{

    const handleSubmit = (evt) =>{
        evt.preventDefault();
    }
    return <div className="login">
        <Link to="/"><p className="login__quit">Quitter <GrFormClose size={32}/></p></Link>
        
        <div>
            <img src={logo} alt="Logo" />
            <form action="" className="form" method="POST" onSubmit={handleSubmit}>
                <div className="form__group">
                    <label className="form__label">Identifiant</label><br></br><br></br>
                    <input name="username" placeholder="identifiant" className="form__input"/>
                </div>

                <div className="form__group">
                    <label className="form__label">Mot de passe</label><br></br><br></br>
                    <input name="password" placeholder="Mot de passe" className="form__input"/>
                </div>
                <button type="submit" className="form__submit">
                    OK
                </button>
            </form>
        </div>
    </div>
}

export default Login;