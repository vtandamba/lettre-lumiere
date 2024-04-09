import { useNavigate } from "react-router-dom";

const Auth = {
  login: async (username, password) => {
    try {
      const response = await fetch('http://lettrelumiere.localhost:8000/api/login_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur de connexion');
      }

      const data = await response.json();
      console.log(data, 'user auth avec token');

      sessionStorage.setItem('token', data.token);
      
      
      if (data) {
        const idResponse = await fetch(`http://lettrelumiere.localhost:8000/apip/users?user_name=${username}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${data.token}`,
            'Content-Type': 'application/json',
          },
        });

        if (idResponse.ok) {
          const userData = await idResponse.json();
     
          return userData['hydra:member'][0]
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'authentification : ", error);
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
