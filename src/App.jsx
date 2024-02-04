import './App.css';
import Posts from './components/Posts';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import LogInForm from './components/LogInForm';
import { useEffect, useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const CheckSession = async () => {
      const JWT = localStorage.getItem('JWT-Blog-Front');
      if (JWT == '') return;
      // send get request to session route to see if signed in
      const response = await fetch('http://localhost:3000/auth/session', {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      });

      const data = await response.json();
      console.log(data);
      if (data && data.message == 'You are signed in.') {
        setLoggedIn(true);
        setUserId(data.user_id);
        setUsername(data.user_name);
      }
    };

    CheckSession();
  }, []);

  const HandleLogOut = () => {
    // delete JWT from
    localStorage.setItem('JWT-Blog-Front', '');
    setUserId(null);
    setLoggedIn(false);
    window.location.reload();
  };
  return (
    <BrowserRouter>
      <nav>
        <Link to={'/'} className="navlink">
          Home
        </Link>
        {userId && <div>{username}</div>}

        {!loggedIn && (
          <Link to={'/sign-up'} className="navlink">
            Sign Up
          </Link>
        )}
        {!loggedIn ? (
          <Link to={'/log-in'} className="navlink">
            Log In
          </Link>
        ) : (
          <Link to={'/'} onClick={HandleLogOut} className="navlink">
            Log Out
          </Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Posts loggedIn={loggedIn} />} />
        <Route
          path="/sign-up"
          element={<SignUpForm setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/log-in"
          element={<LogInForm setLoggedIn={setLoggedIn} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
