import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import PublicInvitation from './pages/PublicInvitation';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-serif italic">EternalTie...</div>;

  return (
    <Routes>
      <Route path="/" element={<LandingPage user={user} logout={logout} />} />
      <Route path="/login" element={<Login onLogin={login} />} />
      <Route path="/register" element={<Register onLogin={login} />} />
      
      <Route element={<ProtectedRoute user={user} />}>
        <Route path="/dashboard" element={<Dashboard user={user} logout={logout} />} />
        <Route path="/editor/:id?" element={<Editor user={user} />} />
      </Route>

      <Route path="/invitation/:slug" element={<PublicInvitation />} />
    </Routes>
  );
}

export default App;
