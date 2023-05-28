import styled from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    const [booking, setBooking] = useState({});
    
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'JlbBWy24nl0PcbNqcXlASkN2';
    }, []);

    return (
        <BrowserRouter>
            <NavContainer>CINEFLEX</NavContainer>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/seats/:id" element={<SeatsPage setBooking={setBooking} />} />
                <Route path="/session/:id" element={<SessionsPage />} />
                <Route path="/success" element={<SuccessPage booking={booking} />} />
            </Routes>
        </BrowserRouter>
    );
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`;