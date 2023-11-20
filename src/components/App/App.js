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
import { Route, Routes, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function App() {
  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  
  const location = useLocation();

  useEffect(() => {
    setLoggedIn(location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies' || location.pathname === '/profile');
  }, [location.pathname]);  
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
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
              />}
          />
          <Route 
            path="/movies"
            element={
              <Movies
              />}
          />
          <Route 
            path="/saved-movies"
            element={
              <SavedMovies
              />}
          />
          <Route 
            path="/profile"
            element={
              <Profile   
              />}
          />
          <Route 
            path="/signup"
            element={
              <Register
              />}
          />
          <Route 
            path="/signin"
            element={
              <Login
              />}
          />
          <Route
            path="/*"
            element={
              <NotFoundError
              />}
          />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;