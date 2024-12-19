// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Feed from './components/feed';
import Login from './components/login';
import Register from './components/register';
import Feed1 from './components/feed1';
import Profile from './components/profile1'; // Import your Profile component

import './css/App.css'; 

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/feed1" element={<Feed1 />} />
                    <Route path="/profile" element={<Profile />} /> {/* New route for Profile */}
                    
                    <Route path="/" element={<Feed />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
