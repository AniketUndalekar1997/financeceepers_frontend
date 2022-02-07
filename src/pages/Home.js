import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasSession } from '../utils/helpers';
import FileUpload from '../Components/FileUpload';


function Home(props) {
    const navigate = useNavigate();

    useEffect(() => {
        const userHasSession = hasSession();

        if (!userHasSession) {
            navigate('/login');
        }
    }, []);

    return (
        <div>
            <FileUpload />
        </div>
    );
}

export default Home;
