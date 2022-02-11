import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { regiserApi } from '../utils/api';
import { hasSession } from '../utils/helpers';
import './NewLogin.css';


function NewLogin() {

    const [name, setName] = useState({ name: "" });
    const [email, setEmail] = useState({ email: "" });
    const [password, setPassword] = useState({ password: "" })
    const [isApiLoading, setApiLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (hasSession()) {
            navigate('/');
        }
    }, [])

    const submit = async (e) => {
        e.preventDefault();
        setApiLoading(true);
        regiserApi({ name, email, password }).then((res) => {
            navigate('/login');

        }).catch((e) => {
            window.alert(e);
        })
    }

    const buttonClass = isApiLoading ? 'loading ui primary button' : 'ui primary button';

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
                                        <h3 class="display-4">Register to our site!</h3>
                                        <p class="text-muted mb-4">Enter your username, Email & password to Register.</p>
                                        <form onSubmit={submit}>
                                            <div class="form-group mb-3">
                                                <input id="inputName" type="text" placeholder="User Name" required="" autofocus="" onChange={(e) => setName(e.target.value)} class="form-control rounded-pill border-0 shadow-sm px-4" />
                                            </div>
                                            <div class="form-group mb-3">
                                                <input id="inputEmail" type="email" placeholder="Email address" required="" autofocus="" onChange={(e) => setEmail(e.target.value)} class="form-control rounded-pill border-0 shadow-sm px-4" />
                                            </div>
                                            <div class="form-group mb-3">
                                                <input id="inputPassword" type="password" placeholder="Password" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" onChange={(e) => setPassword(e.target.value)} />
                                            </div>

                                            {/* <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign in</button> */}
                                            <button type="submit" loading={isApiLoading} className={buttonClass} data-loading-text="<i class='fa fa-spinner fa-spin '></i> Processing">Register</button>
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

