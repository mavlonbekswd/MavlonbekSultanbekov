import { StrictMode } from 'react';
// import { SpeedInsights } from '@vercel/speed-insights';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import './index.css';
import App from './App.jsx';
import './i18n.js';


// SpeedInsights();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
