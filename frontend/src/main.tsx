import 'bootstrap/dist/css/bootstrap.min.css';
import {StrictMode} from 'react';

import App from './App';
import {createRoot} from "react-dom/client";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)