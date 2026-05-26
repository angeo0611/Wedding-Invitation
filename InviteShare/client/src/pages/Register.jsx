import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      onLogin(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-champagne/10 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-xl">
        <h2 className="font-serif text-3xl mb-8 text-center italic">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] uppercase tracking-widest block mb-2 opacity-60">Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)} type="text" required className="w-full border-b border-luxury-dark/10 py-3 outline-none focus:border-sage transition-colors" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest block mb-2 opacity-60">Email Address</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required className="w-full border-b border-luxury-dark/10 py-3 outline-none focus:border-sage transition-colors" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest block mb-2 opacity-60">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required className="w-full border-b border-luxury-dark/10 py-3 outline-none focus:border-sage transition-colors" />
          </div>
          <button type="submit" className="luxury-button w-full py-4 mt-4">Start Creating</button>
        </form>
        <p className="mt-8 text-center text-sm opacity-60">
          Already have an account? <Link to="/login" className="text-sage font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
