import React from 'react'
import  { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";


const Movie = () => {
    const [movie, setMovie] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    const data = await fetch(
      `http://localhost:3000/movies/${id}`
    );
    const result = await data.json();
    setMovie(result);
  };
    return (
        <>
        {movie && (
        <div className="movie_card">
          <div>
            <figure>
              <figcaption>
                <img src={movie.backdrop} alt="photo_arrière_plan" />
              </figcaption>
            </figure>
          </div>
          <div className="infos_movie_container">
            <div className="poster_movie">
              <figure className="imageCover">
                  <figcaption>
                    <img src={movie.poster} alt="poste_event" />
                  </figcaption>
                </figure>
            </div>
            <div className="detail_movie_container">
              <h2>{movie.title}</h2>
              <h5>{movie.release_date}</h5>
              <select>
                <option>{movie.categories}</option>
              </select>
              <div className="description">
                {movie.description}
              </div>
            </div>
            <div className="container_actors">
              <h3>Les Acteurs du film</h3>
              {(movie.actors).map((movieActors) =>(
                <>
                <img src={movieActors.photo} alt="photo_acteurs" />
                <div>
                  <h5>{movieActors.name}</h5>
                </div>
                </>
              ))}

            </div>
            <div className="container_similars_movie">
              <h3>Films Similaires:</h3>
              {(movie.similar_movies).map((movieSimilars) =>(
                <>
                <img src={movieSimilars.poster} alt="photo_acteurs" />
                <div>
                  <h5>{movieSimilars.title}</h5>
                  <h6>{movieSimilars.release_date}</h6>
                </div>
                </>
              ))}

            </div>


              <button><Link to="/" className="retour"> Retour </Link> </button>
            </div>

          </div>

      )}

        </>
    )
}
export default Movie
