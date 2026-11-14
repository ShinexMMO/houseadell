import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './fonts.css';
import './editorial-fonts.css';
import './styles.css';

// Always open at the top: no browser scroll restoration on reload/back,
// and drop any #anchor left in the URL from in-page navigation.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
if (location.hash) history.replaceState(null, '', location.pathname + location.search);
window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
window.addEventListener('pageshow', (e) => {
  if (e.persisted) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
});

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
