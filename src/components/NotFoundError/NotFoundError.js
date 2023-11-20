import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundError.css';

function NotFoundError() {
  return (
    <div className="notfound-error">
      <h1 className="notfound-error__title">404</h1>
      <p className="notfound-error__info">Страница не найдена</p>
      <Link to="/" className="notfound-error__link link">Назад</Link>
    </div>
  )
}
  
export default NotFoundError;