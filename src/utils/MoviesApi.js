import { BFMOVIES_URL } from './Constants';

class MoviesApi {
  constructor(bfmoviesUrl) {
    this._bfmoviesUrl = bfmoviesUrl;
  }

  _getHeaders() {
    return {
      "Content-Type": "application/json"
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

  getMovies() {
    return this._request(this._bfmoviesUrl, {
      method: 'GET', 
      headers: this._getHeaders(),
    });
  }
}

const bfmoviesApi = new MoviesApi(BFMOVIES_URL);

export default bfmoviesApi;