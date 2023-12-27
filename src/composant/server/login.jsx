import { useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Login = ({ onToggleAuthMode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        console.log(await supabase.auth.getUser());
        if (error) {
            console.error('Error signing in:', error.message);
        } else {
            navigate('/');
            console.log('User signed in successfully:', data);
        }
    };
    return (
        <div className="form-container">
            <input
                className='input-log'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className='input-log'
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="auth-button" onClick={handleLogin}>
                Se connecter
            </button>
        </div>
    );
};
export default Login;