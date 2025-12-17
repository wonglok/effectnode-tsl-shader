import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
// import { AuthLayout } from './layout/AuthLayout.tsx';
// import { Login } from './pages/Login.tsx';
// import { Register } from './pages/Register.tsx';
import { LandingPage } from './pages/LandingPage.tsx';
import { StudioPage } from './pages/StudioPage.tsx';

import './index.css';
import '@xyflow/react/dist/style.css';
import { Game03Page } from './pages/Game03Page.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index element={<LandingPage />} />
                <Route path='game' element={<Game03Page></Game03Page>} />
                <Route path='studio' element={<StudioPage />} />

                {/* <Route element={<AuthLayout />}>
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Route> */}
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
