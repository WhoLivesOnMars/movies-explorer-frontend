import { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundError from '../NotFoundError/NotFoundError'
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import api from '../../utils/MainApi';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute.js';
import { register, authorize, checkToken } from '../../utils/auth.js';

function App() {
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', _id: '' });
  const [loggedIn, setLoggedIn] = useState(null);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      checkToken(token)
      api.getCurrentUser()
        .then((res) => {
          setCurrentUser({ name: res.name, email: res.email, _id: res._id })
          setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, []);

  function handleRegister(name, email, password) {
    register(name, email, password)
    .then(() => {
      handleLogin(email, password);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleLogin(email, password) {
    authorize(email, password)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token)
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function signOut() {
    localStorage.clear()
    setLoggedIn(false);
    checkToken('');
    navigate('/', {replace: true});
  }
  
  function handleUpdateUser({ item }) {
    api.setUserInfo({ item: item })
    .then((user) => {
      if (user) {
        setCurrentUser({ name: user.data.name, email: user.data.email, _id: user.data._id })
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  return (
    loggedIn === null ? <Preloader /> :
    <CurrentUserContext.Provider value={{currentUser}}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
        />
        <Routes>
          <Route 
            path="/"
            element={
              <Main 
                loggedIn={loggedIn}
              />
            }
          />
          <Route 
            path="/movies"
            element={
              <ProtectedRouteElement 
                element={Movies}
                loggedIn={loggedIn}
              />
            }
          />
          <Route 
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                loggedIn={loggedIn}
              />
            }
          />
          <Route 
            path="/profile"
            element={
              <ProtectedRouteElement
                element={Profile}
                loggedIn={loggedIn}
                onUpdateUser={handleUpdateUser}
                signOut={signOut}
              />}
          />
          {!loggedIn && <Route 
            path="/signup"
            element={
              <Register
                onRegister={handleRegister}
              />}
          />}
          {!loggedIn && <Route 
            path="/signin"
            element={
              <Login
                onLogin={handleLogin}
              />}
          />}
          <Route
            path="/*"
            element={
              <NotFoundError
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;