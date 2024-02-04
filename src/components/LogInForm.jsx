import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function LogInForm({ setLoggedIn }) {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const HandleFormSubmit = async (e) => {
    e.preventDefault();
    if (username.length < 1) {
      setErrors(['Username must not be empty']);
      return;
    } else if (password.length < 6) {
      setErrors(['Password must be at least 6 characters long']);
      return;
    }

    const loginOptions = {
      username: username,
      password: password,
    };

    const loginResponse = await fetch('http://localhost:3000/auth/log-in', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginOptions),
    });
    const loginData = await loginResponse.json();
    if (loginData.token) {
      setLoggedIn(true);
      localStorage.setItem('JWT-Blog-Front', loginData.token);
      console.log(loginData.token);
      navigate('/');
      window.location.reload();
      setErrors([]);
    } else {
      setErrors([loginData]);
      return;
    }
  };
  return (
    <div>
      <form onSubmit={HandleFormSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Enter your username.."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
        {errors.map((err) => {
          return <div key={err}>{err}</div>;
        })}
      </form>
    </div>
  );
}
