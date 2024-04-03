import { useNavigate } from "react-router-dom";

const Auth = {
    login: async (form) => {
      try {
        const url = `https://mtsene.lpmiaw.univ-lr.fr/lettrelumiere/public/apip/users?user_name=${encodeURIComponent(form.user_name)}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('La requête a échoué avec le statut ' + response.status);
        }
        console.log('après la vérificztion de la response');
        const data = await response.json();
        
        // Trouver l'utilisateur avec le mot de passe correspondant (non recommandé pour des raisons de sécurité).
        const user = data["hydra:member"].find(user => user.password === form.user_password);
        console.log(user)
        if (!user) {
          throw new Error('Utilisateur non trouvé ou mot de passe incorrect.');
        }
        console.log('après la vérificztion de user');
        console.log(user);
      
        
        return user;
        
      } catch (error) {
        throw new Error(error.message);
      }
    },
    isAuthenticated: () => {
      return !!sessionStorage.getItem('user_id');
    },
    logout: () => {
      sessionStorage.removeItem('user_id');
    }
  };
  

export default Auth;