import { BASE_URL } from './Constants';

class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._token = '';
  }

  _getHeaders() {
    return {
      authorization: this._token,
      "Content-Type": "application/json",
    };
  }

  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._getJson);
  }

  getCurrentUser() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._getHeaders(),
  });
  }

  setUserInfo(name, email) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        email: email,
      })
    });
  }

  getMovies() {
    return this._request(`${this._baseUrl}/movies`, {
      method: 'GET', 
      headers: this._getHeaders(),
    });
  }

  saveMovies(item) {
    return this._request(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        country: item.country,
        director: item.director,
        duration: item.duration,
        year: item.year,
        description: item.description,
        image: `https://api.nomoreparties.co/${item.image.url}`,
        trailerLink: item.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${item.image.formats.thumbnail.url}`,
        movieId: item.id,
        nameRU: item.nameRU,
        nameEN: item.nameEN
      })
    });
  }

  deleteMovie(id) {
    return this._request(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    });
  }

  register(name, email, password) {
    console.log('Выполняется запрос на регистрацию');
    return this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({ name, email, password })
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка регистрации: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
  };
  
   authorize(email, password) {
    console.log('Выполняется запрос на вход');
    return this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({ email, password })
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Ошибка регистрации: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
  };
  
  checkToken(token) {
    this._token = `Bearer ${token}`
  }
}

const api = new Api(BASE_URL);

export default api;