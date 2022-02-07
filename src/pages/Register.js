import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { regiserApi } from '../utils/api';
import { hasSession } from '../utils/helpers';


function Register() {
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
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Sign Up</h1>
            <div class="form-group">
                <input className="form-control" placeholder="username" required
                    onChange={(e) => setName(e.target.value)} />
            </div>

            <input type="email" id="floatingInput1" className="form-control" placeholder="name@example.com" required
                onChange={(e) => setEmail(e.target.value)} />

            <input type="password" id="floatingPassword" className="form-control" placeholder="Password" required
                onChange={(e) => setPassword(e.target.value)} />

            {/* <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button> */}
            <button type="submit" loading={isApiLoading} className={buttonClass} data-loading-text="<i class='fa fa-spinner fa-spin '></i> Processing">Register</button>
        </form>
    );
}

export default Register;
