import React, { useState } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import style from "./style.module.css";
import AdminIcon from '../../../Assets/Auth/adminIcon.webp'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../Redux/actions/authAction';
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export default function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword)
    };

    //Login authentication
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = () => {

        if (email && password) {
            setIsLoading(true)
            dispatch(login(email, password, navigate))

                .then(() => {
                    setIsLoading(false)
                })
                .catch(() => {
                    setIsLoading(false)
                    toast.error('LOGIN FAIL')
                })

        } else {
            setIsLoading(false)
            toast.error('Pleace check your email and password')
        }

    }

    return (
        <>
            <Grid className={style.EnterScreen}>

                <Grid className={style.secondbackground}>

                    <Grid className={style.loginForm}>

                        <Grid container justifyContent='center' className={style.AdminIcon}>
                            <img src={AdminIcon} alt='adminicon' />
                        </Grid>
                        <h3>Admin</h3>

                        <form>

                            <Grid className={style.formGroup}>
                                <input type='email' placeholder='Email' value={email} onChange={handleEmailChange} />
                            </Grid>

                            <Grid className={style.formGroupPassword}>
                                <input type={showPassword ? 'text' : 'password'} placeholder='password' value={password} onChange={handlePasswordChange} />

                                <i className={`password-toggle-icon fas  ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={handlePasswordToggle}> </i>
                            </Grid>

                            {
                                isLoading ? (
                                    <button disabled>
                                        <CircularProgress style={{ color: 'white', height: '1rem', width: '1rem' }} />
                                    </button>
                                ) : (
                                    <button className={style.btn} onClick={handleLogin} >Login</button>
                                )
                            }

                        </form>

                    </Grid>

                </Grid>

            </Grid>
        </>
    )
}

