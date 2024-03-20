import { useNavigate } from "react-router-dom";

const Auth = {
   
    login : async(form)=>{
        
        try{
            const response = await fetch(`https://vtandamb.lpmiaw.univ-lr.fr/PHP/lettre_en_lumiere/back-lettre-en-lumiere/api/api.user.php?user_name=${form.user_name}&user_password=${form.user_password}`, )
            console.log(response);
    
            if (!response.ok) {
                throw new Error('La requête a échoué avec le statut ' + response.status);
              }
              const data = await response.json();
            
              console.log(response.jwt);
              console.log(data);
              return data
        }catch(error){
            throw new Error(error)
        }
    },
    isAuthentificated : () => {
        return !!localStorage.getItem('user_id');
    },

    logout : () => {
        localStorage.removeItem('user_id')
    }
   
}

export default Auth;