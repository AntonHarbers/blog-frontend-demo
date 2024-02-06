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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const CheckSession = async () => {
      const JWT = localStorage.getItem(import.meta.env.VITE_JWT);
      if (JWT == '') return;
      // send get request to session route to see if signed in
      const response = await fetch(
        `${import.meta.env.VITE_API_PATH}auth/session`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        }
      );

      const data = await response.json();
      if (data && data.message == 'You are signed in.') {
        setLoggedIn(true);
        setUserId(data.user_id);
        setUsername(data.user_name);
      }
    };

    CheckSession();
    setIsLoading(false);
  }, []);

  const HandleLogOut = () => {
    localStorage.setItem(import.meta.env.VITE_JWT, '');
    setUserId(null);
    setLoggedIn(false);
    window.location.reload();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        <Route
          path="/"
          element={<Posts loggedIn={loggedIn} userId={userId} />}
        />
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
