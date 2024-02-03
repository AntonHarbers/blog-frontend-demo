import './App.css';
import Posts from './components/Posts';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import LogInForm from './components/LogInForm';
import { useEffect, useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const CheckSession = async () => {
      const JWT = localStorage.getItem('JWT');
      // send get request to session route to see if signed in
      // if signed in set loggedIn to true.

      console.log(JWT);
    };

    CheckSession();
  }, []);

  const HandleLogOut = () => {
    // delete JWT from
    setLoggedIn(false);
  };
  return (
    <BrowserRouter>
      <nav>
        <Link to={'/'} className="navlink">
          Home
        </Link>
        <Link to={'/sign-up'} className="navlink">
          Sign Up
        </Link>

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
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/log-in" element={<LogInForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
