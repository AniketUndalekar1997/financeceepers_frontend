import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi, userApi } from '../utils/api';
import { CUSTOM_EVENT } from '../utils/constants';
import { dispatchCustomEvent, hasSession } from '../utils/helpers';
import { setUserData } from '../utils/storage';

function Login() {
    const [email, setEmail] = useState({ email: "" });
    const [password, setPassword] = useState({ password: "" });

    const navigate = useNavigate();

    useEffect(() => {
        if (hasSession()) {
            navigate('/')
        }
    }, [])

    const submit = async (e) => {
        e.preventDefault();
        loginApi({ email, password }).then((res) => {
            userApi().then((res) => {
                setUserData(res.data);

                navigate('/');

                dispatchCustomEvent(CUSTOM_EVENT.LOGIN)
            })
        }).catch((e) => {
            window.alert(e);
        })
    }

    return (
        <form cla onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
                <input type="email" className="form-control" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    );
}

export default Login;

