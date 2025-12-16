import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { About } from './pages/About.tsx';
// import { AuthLayout } from './layout/AuthLayout.tsx';
// import { Login } from './pages/Login.tsx';
// import { Register } from './pages/Register.tsx';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index element={<App />} />
                <Route path='about' element={<About />} />

                {/* <Route element={<AuthLayout />}>
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Route> */}
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
