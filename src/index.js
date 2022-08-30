import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ThemeProvider} from "./themeContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider>
        <App className={'dark:bg-gray-700'} />
    </ThemeProvider>
);
