import React from 'react'
import  { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import '../styles/Movie.css'


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
          <div className="infos_movie_container">
            <div className="first_name">
              <div className="poster_movie">
                <figure className="imageCover">
                    <figcaption>
                      <img src={movie.poster} alt="poste_event" />
                    </figcaption>
                  </figure>
              </div>
              <div className="detail_movie_container">
                <p className="title">{movie.title}</p>
                <p className="release_date">{new Date(movie.release_date).toLocaleDateString('fr-FR')}</p>

                  <p>{movie.categories}-</p>

                <div className="descriptionM">
                  {movie.description}
                </div>
              </div>
            </div>

            <div className="container_actors">
              <h3>Les Acteurs du film</h3>
              <div className="card_actors">
                {(movie.actors).map((movieActors) =>(
                    <div >
                        <img src={movieActors.photo} alt="photo_acteurs" className="actors_poster" />
                        <div>
                          <h5>{movieActors.name}</h5>
                        </div>
                    </div>
                ))}
              </div>

            </div>
            <div className="container_similars_movie">
              <h3>Films Similaires:</h3>
              <div className="card_movie_similar">
                {(movie.similar_movies).map((movieSimilars) =>(
                  <div>
                    <img src={movieSimilars.poster} alt="photo_de film similaire"  className="movie_similar_poster"/>
                    <div>
                      <span>{movieSimilars.title}</span>

                    </div>
                  </div>
                ))}
              </div>


            </div>


              <button className="btn_retour"><Link to="/" className="retour"> Retour </Link> </button>
            </div>

          </div>

      )}

        </>
    )
}
export default Movie
