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
        <div className="containerDetail">
          <p className="title">{movie.title} </p>
          <div className="Details">
              <figure className="imageCover">
                <figcaption>
                  <img src={movie.poster} alt="img event" width="80%" height="auto" />
                </figcaption>
              </figure>
              <div className="description">
                {movie.description}
              </div>
              <button><Link to="/" className="retour"> Retour </Link> </button>
            </div>

          </div>

      )}

        </>
    )
}
export default Movie
