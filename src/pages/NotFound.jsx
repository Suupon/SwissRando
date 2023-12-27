import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Constant from '../assets/constants/Constants';
import '../assets/styles/notFound/NotFound.css';

/**
 * Page d'erreur 404, redirection au bout 10 secondes.
 * @returns La page d'erreur 404.
 */

const NotFound = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
        navigate('/login');
        }, 10000);

        return () => clearTimeout(timeoutId);
    }, [navigate]);

    return (
        <div className='container'>
        <h1>{Constant.CODE_MESSAGE_ERROR}</h1>
        <p>{Constant.NOT_FOUND}</p>
        </div>
    );
};

export default NotFound;