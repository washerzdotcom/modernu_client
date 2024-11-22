import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, useLocation } from 'react-router-dom';

const Spinnerm = ({ path = 'login' }) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((preValue) => --preValue)
        }, 1000);
        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        })
        return () => clearInterval(interval)
    }, [count, navigate, location, path])
    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
                <h1 className='text-center'>Redirecting to you in {count} second </h1>
                <Spinner />
            </div>
        </>
    )
}

export default Spinnerm