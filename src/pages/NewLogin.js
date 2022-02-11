import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi, userApi } from '../utils/api';
import { CUSTOM_EVENT } from '../utils/constants';
import { dispatchCustomEvent, hasSession } from '../utils/helpers';
import { setUserData } from '../utils/storage';
import './NewLogin.css';


function NewLogin() {

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
        <div className="maincontainer">
            <div class="container-fluid">
                <div class="row no-gutter">
                    <div class="col-md-6 d-none d-md-flex bg-image"></div>
                    <div class="col-md-6 bg-light">
                        <div class="login d-flex align-items-center py-5">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-10 col-xl-7 mx-auto">
                                        <h3 class="display-4">Login to our site!</h3>
                                        <p class="text-muted mb-4">Enter your username and password to log on.</p>
                                        <form onSubmit={submit}>
                                            <div class="form-group mb-3">
                                                <input id="inputEmail" type="email" placeholder="Email address" required="" autofocus="" onChange={(e) => setEmail(e.target.value)} class="form-control rounded-pill border-0 shadow-sm px-4" />
                                            </div>
                                            <div class="form-group mb-3">
                                                <input id="inputPassword" type="password" placeholder="Password" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                            <div class="custom-control custom-checkbox mb-3">
                                                <input id="customCheck1" type="checkbox" checked class="custom-control-input" />
                                                <label for="customCheck1" class="custom-control-label">Remember password</label>
                                            </div>
                                            <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign in</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default NewLogin;

