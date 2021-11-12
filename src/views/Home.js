import { useState, useEffect } from "react";
import  '../styles/Home.css'
import {Link} from 'react-router-dom'

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(`http://localhost:3000/movies`);
    const result = await data.json();
    console.log(result);
    setMovieList(result);
  };

  return (
    <div>
      <form className="form-search">
        <span>
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
            {movieList.map((movie) => (
                <li className="list-movie">
                  <Link to={`/movie/${movie.id}`}>
                  <span className="image-movie">
                    <img src={movie.poster} alt="poster du film" width="200px" height="250px" className="list-img" />
                  </span>
                  </Link>
                  <span className="movie-info">
                    <p>{movie.title} </p>
                    <p> {movie.release_date} </p>
                    <p>{movie.description}</p>
                  </span>
                  <span className="container-btn">
                    <button>Modifier</button>
                    <button>Supprimer</button>
                  </span>

                </li>

            ))}
          </ul>
        </div>
      )}
      ,
    </div>
  );
};

export default Home;
