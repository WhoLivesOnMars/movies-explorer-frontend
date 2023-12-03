import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute.js';
// import { register, authorize, checkToken } from '../../utils/auth.js';

function App() {
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', _id: '' });
  const [loggedIn, setLoggedIn] = useState(null);
  const [token, setToken] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    } else setLoggedIn(false);
  }, []);

  useEffect(() => {
    if (token) {
      api.checkToken(token)
      api.getCurrentUser()
        .then((res) => {
          setCurrentUser({ name: res.name, email: res.email, _id: res._id })
          setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [token]);

  function handleRegister(name, email, password) {
    console.log('Начало регистрации');
    api.register(name, email, password)
    .then(() => {
      console.log('Регистрация завершена успешно');
      handleLogin(email, password);
    })
    .catch((err) => {
      console.log("Ошибка при выполнении запроса:", err);
    })
    console.log('Конец регистрации');
  }

  function handleLogin(email, password) {
    api.authorize(email, password)
    .then((data) => {
      if (data.token) {
        console.log('Setting token to localStorage:', token);
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      } else {
        console.log('Ошибка при выполнении запроса: Отсутствует токен в ответе сервера.');
      }
    })
    .catch((err) => {
      console.log("Ошибка при выполнении запроса:", err);
    })
  }

  function signOut() {
    localStorage.clear()
    setLoggedIn(false);
    api.checkToken('');
    navigate('/', {replace: true});
  }
  
  function handleUpdateUser({ name, email }) {
    api.setUserInfo({ name, email })
    .then((user) => {
      setCurrentUser(user)
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  return (
    loggedIn === null ? <Preloader /> :
    <CurrentUserContext.Provider value={{currentUser, token}}>
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