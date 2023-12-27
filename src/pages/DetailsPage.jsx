import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import SliderContainer from "../composant/SliderContainer.jsx";
import Bareme from "../composant/bareme.jsx";
import TechSummary from "../composant/TechSummary.jsx";
// import "./index.css";
import techmeterLogo from "../assets/techmeter-logo.svg"; 
import SliderContext from "../composant/SliderContext";
import ButtonGeneric from "../composant/ButtonGeneric.jsx";
import { useNavigate } from "react-router-dom";
import Constant from "../assets/constants/Constants.jsx";
import { supabase } from "../supabase";

const App = () => {
    const [values, setValues] = useState({});
    const navigate = useNavigate();

    const buttonStyle = {
        display: "flex",
        justificontent: "start",
        background: "transparent",
        color: "white",
        border: "1px solid white",
        width: "65px",
        height: "20px",
        cursor: "pointer",
     }
     

    const navigateToPage = () => {
        navigate("/")
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

    return (
        <SliderContext.Provider value={{ values, setValues }}>
        <div style={{margin: "0 auto", maxWidth: "100rem", padding: "2rem 5%"}}>
            <div className='flex justify-between'>
                <img src={techmeterLogo} alt="Techmeter logo" style={{width: "15rem", marginBottom: "2rem"}}/>
                <button className="auth-button" name={Constant.LOGOUT} onClick={logout}>{Constant.LOGOUT}</button>                
            </div>
            <ButtonGeneric name={Constant.RETURN} onClick={navigateToPage} />
            <React.StrictMode>
            <Bareme/>
            <SliderContainer name="Composant" desc="Les composants sont les blocs de construction de l'interface utilisateur dans React.
    Ils peuvent être de deux types : fonctionnels (stateless) ou de classe (stateful)." />
            <SliderContainer name="JSX" />
            <SliderContainer name="Props" />
            <SliderContainer name="Cycle de vie" />
            <SliderContainer name="Hooks" />
            <SliderContainer name="Evènement" />
            <SliderContainer name="Listes et clés" />
            <TechSummary />
            </React.StrictMode>
        </div>
        </SliderContext.Provider>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

export default App;