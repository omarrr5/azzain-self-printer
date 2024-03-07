import React, { useState } from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation'

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    setUsername('');
    setPassword('');
  };


  return (
    <div>
      <BackgroundAnimation/>
      <div className="login-form">
        <h1>Login to Azzain Ink</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        {message &&
            <div className="alert">
              <p>{message}</p>
            </div>
          }
      </div> 
    </div>
  )
}

export default Login
