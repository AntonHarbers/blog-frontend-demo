import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm() {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const HandleFormSubmit = async (e) => {
    e.preventDefault();
    if (username.length < 1) {
      setErrors(['Username must not be empty']);
      return;
    } else if (password.length < 6) {
      setErrors(['Password must be at least 6 characters long']);
      return;
    } else if (confirmPassword != password) {
      setErrors(['Confirm password must match the password']);
      return;
    }

    navigate('/');

    setErrors([]);
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
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Cofirm your password.."
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
        {errors.map((err) => {
          return <div key={err}>{err}</div>;
        })}
      </form>
    </div>
  );
}
