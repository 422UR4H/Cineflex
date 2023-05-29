import styled from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";


export default function App() {
    const [booking, setBooking] = useState({});

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'JlbBWy24nl0PcbNqcXlASkN2';
    }, []);

    return (
        <BrowserRouter>
            <NavContainer>
                <Button data-test="go-home-header-btn" />
                CINEFLEX
            </NavContainer>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/assentos/:id" element={<SeatsPage setBooking={setBooking} />} />
                <Route path="/sessoes/:id" element={<SessionsPage />} />
                <Route path="/sucesso" element={<SuccessPage booking={booking} />} />
            </Routes>
        </BrowserRouter>
    );
}

function Button() {
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <StyledButton onClick={() => navigate(-1)} disabled={isHomePage} isHomePage={isHomePage}>
            <img src="../public/arrow-back-sharp.svg" />
        </StyledButton>
    );
}

const NavContainer = styled.div`
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    width: 100%;
    height: 70px;

    display: inline-grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-content: center;
    
    position: fixed;
    top: 0;

    a {
        text-decoration: none;
        color: #E8833A;
    }
`;

const StyledButton = styled.button`
    background-color: inherit;
    color: black;
    width: 35px;
    height: 35px;
    padding: 0;
    margin-left: 14px;

    opacity: ${({ isHomePage }) => (isHomePage ? 0 : 1)};

    img {
        width: 35px;
    }
`;