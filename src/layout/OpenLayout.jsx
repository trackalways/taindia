import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from "../components/shared/Navbar"
import Footer from "../components/shared/Footer"

const OpenLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default OpenLayout