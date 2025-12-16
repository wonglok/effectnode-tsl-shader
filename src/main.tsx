import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
// import { AuthLayout } from './layout/AuthLayout.tsx';
// import { Login } from './pages/Login.tsx';
// import { Register } from './pages/Register.tsx';
import './index.css';
import { LandingPage } from './LandingPage.tsx';
import { Studio } from '../lib/main.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index element={<LandingPage />} />
                <Route path='studio' element={<Studio />} />

                {/* <Route element={<AuthLayout />}>
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Route> */}
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
