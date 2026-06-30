import { useState } from 'react';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';


export default function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  async function handleSubmit() {
    if (!email || !password || (!isLogin && !name)) {
      setMsg("Please fill in all fields");
      return;
    }

    try {
      const response = isLogin
        ? await fetch(`${API}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
            })
        : await fetch(`${API}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
            });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        onLogin(data.token, data.name); // capital L — matches prop name
      } else {
        setMsg(data.message || "Something went wrong");
      }
    } catch (err) {
      setMsg("Error occurred. Please try again.");
    }
  }

  return (
  <div className="auth-container">
    <div className="auth-box">
      <div className="auth-logo">📋</div>
      <h2 className="auth-title">Job Tracker</h2>
      <p className="auth-subtitle">
        {isLogin ? 'Welcome back! Login to continue' : 'Create your free account'}
      </p>

      <div className="auth-divider"></div>

      {msg && <p className="auth-error">{msg}</p>}

      {!isLogin && (
        <input
          className="form-input"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        className="form-input"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="form-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="submit-btn" onClick={handleSubmit}>
        {isLogin ? 'Login' : 'Create Account'}
      </button>

      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span
          className="toggle-link"
          onClick={() => { setIsLogin(!isLogin); setMsg(''); }}
        >
          {isLogin ? ' Register' : ' Login'}
        </span>
      </p>
    </div>
  </div>
);
}