import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import Camera from './Camera.tsx';
import Mic from './Mic.tsx';
import R3F from './R3F.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/camera" element={<Camera />} />
                <Route path="/mic" element={<Mic />} />
                <Route path="/r3f" element={<R3F />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
