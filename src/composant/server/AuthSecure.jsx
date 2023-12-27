import { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { supabase } from "../../supabase"; 
import Constant from '../../assets/constants/Constants';

// eslint-disable-next-line react/prop-types
const AuthSecure = ({ children }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
            const authenticated = await supabase.auth.getUser()
            if (authenticated?.data?.user === null) {
            navigate('/login');
          } else {
            localStorage.setItem('email', JSON.stringify(authenticated?.data?.user?.email));
            setIsLoading(false);
          }
        } catch (error) {
          console.error(Constant.MESSAGE_ERROR_AUTH, error);
        }
      };
  
      checkAuth();
    }, [navigate]);
  
    if (isLoading) {
      return <p>{Constant.VERIF_AUTH}</p>;
    }
    return children;
  };

  export default AuthSecure;   