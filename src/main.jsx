import { useState } from "react";
import ReactDOM from "react-dom/client";
import SliderContext from './composant/SliderContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import "./index.css";
import DetailsPage from "./pages/DetailsPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import AuthSecure from "./composant/server/AuthSecure.jsx";
import NotFound from "./pages/NotFound.jsx";
import { AuthContextProvider } from "./utils/context/AuthContext.jsx";

function Main() {
  const [sliderValues, setSliderValues] = useState();
 
  return (
    <AuthContextProvider>
      <SliderContext.Provider value={{ values: sliderValues, setValues: setSliderValues }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthSecure><HomePage/></AuthSecure>}/>
            <Route path="/details/:name" element={<AuthSecure><DetailsPage/></AuthSecure>}/>
            <Route path="/login" element={<AuthPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SliderContext.Provider>
    </AuthContextProvider>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Main />);