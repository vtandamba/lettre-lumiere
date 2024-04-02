import { useNavigate } from "react-router-dom";

const Auth = {
   
    login : async(form)=>{
        
        try{
            const response = await fetch(`https://mtsene.lpmiaw.univ-lr.fr/lettrelumiere/public/apip/users?user_name=${form.user_name}&user_password=${form.user_password}`, )
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
        return !!sessionStorage.getItem('user_id');
    },

    logout : () => {
        sessionStorage.removeItem('user_id')
    }
   
}

export default Auth;