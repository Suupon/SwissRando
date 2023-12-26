import { useEffect } from 'react';
import BarChart from '../composant/BarChart.jsx';
import TechnosList from '../composant/TechnosList.jsx';
import Data from "../assets/datas/Data.json";
import Constant from '../assets/constants/Constants';
import '../assets/styles/homePage/HomePage.css';
import { useNavigate } from 'react-router';
import techmeterLogo from "../assets/techmeter-logo.svg";
import { supabase } from "../supabase";
import { useAuth } from "../utils/context/AuthContext";
/**
 * Evalution selon le type de technologie.
 * @returns La page d'accueil avec le graphique et la liste des technologies.
 */
const HomePage = () => {
    const navigate = useNavigate();
    const { data } = useAuth();
    const email = JSON.parse(localStorage.getItem('email'));

    useEffect(() => {
    }, [data, email]);

    const navigateToPage = (name) => {
        navigate('/details/' + name, {replace: true});
    }
   
    const logout = async() =>{
        try {
            await supabase.auth.signOut();
            console.log('Utilisateur déconnecté avec succès.');
            navigate('/login');
        } catch (error) {
            console.error('Erreur lors de la déconnexion :', error.message);
        }      
    }
    
    return(
        <div className='container-homePage' style={{margin: "0 auto", maxWidth: "100rem", padding: "2rem 5%"}}>
            <div className='flex justify-between'>
                <img src={techmeterLogo} alt="Techmeter logo" style={{width: "15rem", marginBottom: "2rem"}}/>
                <button className="auth-button" name={Constant.LOGOUT} onClick={logout}>{Constant.LOGOUT}</button>                
            </div>
            <div style={{margin: "2rem 0"}}>
                <div style={{marginBottom:"50px"}}>
                    <h1>{data?.user === null ? email : data?.user?.email}</h1>
                    <span style={{textDecoration: "underline"}}> A4 Fullstack</span>
                </div>
                <BarChart datas={Data}/>
            </div>
            <div className='container-technosList'>
                <TechnosList onClick={navigateToPage}/>
            </div>
        </div>
    )
};

export default HomePage;