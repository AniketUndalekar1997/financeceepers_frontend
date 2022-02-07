import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { CUSTOM_EVENT } from '../utils/constants';
import {
    hasSession, listenToCustomEvent,
    unListenToCustomEvent, dispatchCustomEvent
} from '../utils/helpers';
import { getUserData, clearAllData, deleteJWTCookies } from '../utils/storage';
import { logoutApi } from '../utils/api';

function Nav(props) {
    const navigate = useNavigate();

    const [userHasSession, setUserSession] = useState(hasSession());

    useEffect(() => {
        listenToCustomEvent(CUSTOM_EVENT.LOGIN, () => setUserSession(hasSession()));
        return unListenToCustomEvent(CUSTOM_EVENT.LOGIN);
    }, [])

    const onLoggedOutClick = async (e) => {
        e.preventDefault();
        logoutApi().then((res) => {
            clearAllData();

            deleteJWTCookies();

            navigate('/login');

            setUserSession(false);
        }).catch((e) => {
            window.alert(e);
        })
    }

    const getUserLogoutUI = () => {
        return (
            <>
                <li className="nav-item">
                    <Link className="nav-link active" to='/login'>Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to='/register'>Register</Link>
                </li>
            </>
        )
    }

    const getUserLoggedInUI = () => {
        const userData = getUserData();

        return (
            <>
                <li className="nav-item">
                    <div className="nav-link active" >Welcome {userData?.name},</div>
                </li>
                <li className="nav-item">
                    <div onClick={onLoggedOutClick} className="nav-link active cur-po">Logout</div>
                </li>
            </>
        );
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand">Home</Link>
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        {userHasSession ? getUserLoggedInUI() : getUserLogoutUI()}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
