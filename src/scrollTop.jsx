/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const scrollTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default scrollTop