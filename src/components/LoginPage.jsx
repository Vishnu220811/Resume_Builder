// components/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password) {
      navigate('/form');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} className="border p-2 mb-2 w-full" />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="border p-2 mb-2 w-full" />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2">Login</button>
    </div>
  );
};

export default LoginPage;
