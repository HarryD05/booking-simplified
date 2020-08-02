import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import AuthProvider from './context/AuthContext';
import NavProvider from './context/NavContext';

ReactDOM.render(<AuthProvider><NavProvider><App /></NavProvider></AuthProvider>, document.getElementById('root'));

