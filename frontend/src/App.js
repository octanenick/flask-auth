import React, { useState, useEffect } from 'react';
import api from './api';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await api.post('/api/register', {
        username: username,
        password: password
      });
      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  }

  return (
    <div className="container">
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister} className="btn btn-primary">Register</button>
      <p>{message}</p>
    </div>
  );
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post('/api/login', {
        username: username,
        password: password
      });
      setMessage("Login successful. Your token: " + response.data.token);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  }

  return (
    <div className="container">
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin} className="btn btn-primary">Login</button>
      <p>{message}</p>
    </div>
  );
}

function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getProtectedMessage = async () => {
      try {
        const response = await api.get('/api/protected');
        setMessage(response.data.message);
      } catch (error) {
        setMessage("You are not logged in.");
      }
    }

    getProtectedMessage();
  }, []);

  return (
    <div className="container">
      <p>{message}</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="container my-3">
        <Link to="/" className="btn btn-link">Home</Link>
        <Link to="/register" className="btn btn-link">Register</Link>
        <Link to="/login" className="btn btn-link">Login</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
