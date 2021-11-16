import { useState, useEffect } from "react";
import  '../styles/Home.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Home = (props) => {
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  //Fonction permettant de recupérer tous les films du server local json
  const fetchData = async () => {
    const data = await fetch(`http://localhost:3000/movies`);
    const result = await data.json();
    setMovieList(result);

  };

  // fonction permettant de supprimer un film du server en cliquant sur le bonton supprimer
  const deleteMovie = (id) =>{
    axios.delete(`http://localhost:3000/movies/${id}`)
    .then((response) => console.log(response.data))
    .catch((er) => console.log(er));
  };

  return (
    <div>
      <form className="form-search">
        <span className="form-search-title">
          <label>Titre </label>
          <input type="text" name="titre" />
        </span>
        <span>
          <label>date de sortie</label>
          <input type="date" name="date-sortie" />
        </span>
        <span>
          <label>Catégories</label>
          <select>
            <option value="">Comédies</option>
            <option value="">Action</option>
            <option value="">Jeunesse</option>
          </select>
        </span>
      </form>

      {movieList && (
        <div className="container-list-movie">
          <ul className="card-list">
            {movieList.map((movie, key) => (
                <li className="list-movie" key={key}>
                  <Link to={`/movie/${movie.id}`}>
                  <span className="image-movie">
                    <img src={movie.poster} alt="poster du film" width="200px" height="250px" className="list-img" />
                  </span>
                  </Link>
                  <span className="movie-info">
                    <span className="movie-info-title">{movie.title} </span>
                    <span> {new Date(movie.release_date).toLocaleDateString('fr-FR')} </span>
                    <p className="description">{movie.description}</p>
                  </span>
                  <span className="container-btn">
                    <button><Link to={`/updatemovie/${movie.id}`} className="btn">Modifier</Link></button>
                    <button onClick={() => deleteMovie(movie.id)} className="btn">Supprimer</button>
                  </span>

                </li>

            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
