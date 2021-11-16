
import React, { useState, useEffect, useRef } from "react";
import "../styles/AddMovie.css";
import axios from 'axios'

const apiKey = "fb5eca5a2d860a889239aa2f70eae050";
const apiImageUrl = "https://image.tmdb.org/t/p/w342";
const apiBaseUrl = "https://api.themoviedb.org/3/movie";

const AddMovie = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [moviel, setMoviel] = useState(null);
  const titleRef = useRef();
  const dateRef = useRef();
  const overviewRef = useRef();
  const posterRef = useRef();

  useEffect(() => {
    if (searchTitle !== "") {
      fetchData();
    }
  }, [searchTitle]);

  useEffect(() => {
    if (selectedMovie !== null) {
      console.log("current value a changé", selectedMovie);
      searchMovieById(selectedMovie.id);

      console.log(selectedMovie);
    }
  }, [selectedMovie]);

  // requete pour reccupérer les films selon les mots clés saisis dans le champs via le titre
  const fetchData = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTitle}`
    );
    const result = await data.json();
    setMovieList(result.results);

  };
  // fonction permettant de recupérer chaque lettre saisi par l'utilisateur pour la recherche d'un nouveau film dans la bd TDMB
  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchTitle(value);
  };
  const searchMovieById = async (id) => {
    // recupération des données lié à un film
    const response = await fetch(
      `${apiBaseUrl}/${id}?api_key=${apiKey}&language=fr-FR`
    );
    const apiMovie = await response.json();

    //  recupération de la liste des acteurs d'un film
    const response2 = await fetch(
      `${apiBaseUrl}/${id}/casts?api_key=${apiKey}&language=fr-FR`
    );
    const apiActors = await response2.json();

    //  recupération de la liste des films similaires d'un film
    const response3 = await fetch(
      `${apiBaseUrl}/${id}/similar?api_key=${apiKey}&language=fr-FR`
    );
    const apiSimilarMovies = await response3.json();

    // get categories
    // const response3 = await fetch(
    //   `${apiBaseUrl}/${id}/similar?api_key=${apiKey}&language=fr-FR`
    // );
    // const apiCategories = await response3.json();

    const actors = [];
    for (let i = 0; i < apiActors.cast.length; i++) {
      let actor = apiActors.cast[i];
      actors.push({
        name: actor.name,
        photo: `${apiImageUrl}${actor.profile_path}`,
        character: actor.character,
      });
    }


    let similarMovies = []; //initialise un tableau vide
    for (let i = 0; i < apiSimilarMovies.results.length; i++) { // regarde pour chaque film similaire du film de l'api
      let apiSimilarMovie = apiSimilarMovies.results[i]; //on accede à ses données qu'on stoque dans nos variables après
      actors.push({
        title: apiSimilarMovie.title,
        poster: `${apiImageUrl}${apiSimilarMovie.poster_path}`,
        release_date: apiSimilarMovie.release_date,
      });
    }


    setMoviel({
      title: apiMovie.title,
      release_date: apiMovie.release_date,
      categories: ["Action", "Aventure", "Science-Fiction"],
      description: apiMovie.description,
      poster: `${apiImageUrl}${apiMovie.poster_path}`,
      actors,
      similar_movies: similarMovies,
      id: apiMovie.id,
    });

    titleRef.current.value = selectedMovie.title;
    dateRef.current.value = selectedMovie.release_date;
    overviewRef.current.value = selectedMovie.overview;
    posterRef.current.value =
      "https://image.tmdb.org/t/p/original" + selectedMovie.poster_path;
  };

   const SaveMovie = (e) => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/movies',
            data: moviel
        })
        .then (res => {
          window.location.replace('/')
        })
    }

  const handleCurrentValue = (e) => {
    let input = e.target;
    let value = input.value;
    let list = input.getAttribute("list");
    const options = document.getElementById(list)
      ? document.getElementById(list).childNodes
      : [];

    if (options.length === 0) {
      setSelectedMovie(null);
    }

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        const movie = options[i].getAttribute("data-movie");
        setSelectedMovie(JSON.parse(movie));
      }
    }
  };
  return (
    <>
      <div></div>
      {movieList && (
        <>
          <form>
            <div>
              <label htmlFor="list-movie" className="label_serch">
                Rechercher un film:
              </label>
              <input
                list="list-movie"
                type="text"
                name="list-movie"
                className="search-title"
                onChange={handleSearch}
                onSelect={handleCurrentValue}
              />
              {movieList.length > 0 && (
                <datalist id="list-movie">
                  {movieList.map((movie, key) => (
                    <option
                      key={key}
                      value={movie.original_title}
                      data-movie={JSON.stringify(movie)}
                    />
                  ))}
                </datalist>
              )}
            </div>
          </form>

          {selectedMovie && (
            <form className="form_new_movie">
              <fieldset className="card_new_movie">
                <legend className="legend">Formulaire d'ajout</legend>
                <div className="title_and_date">
                  <span>
                    <label>Titre:</label>
                    <input type="text" ref={titleRef} required />
                  </span>
                  <span>
                    <label>Date de sortie:</label>
                    <input type="date" ref={dateRef} required/>
                  </span>
                </div>
                <div className="categories_new_movie">
                  <span>Categorie</span>
                  <select required>
                    <option value="humour">humour</option>
                    <option value="humour">aventure</option>
                  </select>
                </div>
                <div className="description_new_movie">
                  <label>Descritiopn:</label>
                  <input
                    type="textarea"
                    ref={overviewRef}
                    className="new_desc" required
                  />
                </div>
                <div>
                  <label>Poster de film</label>
                  <input
                    type="url"
                    width="20px"
                    height="20px"
                    alt="poster_movie_tnbd"
                    ref={posterRef}

                  />
                </div>
                <div>
                  <h3>Les acteurs du film</h3>
                  <div>
                    <label>Image</label>
                    <input type="url" alt="poster_acteurs" />
                  </div>
                  <div>
                    <label>Nom de l'acteur {selectedMovie.name}</label>
                    <input type="text" alt="nom_acteur" />
                  </div>
                </div>
                <div>
                  <h3>Les films similaires</h3>
                  <input type="text" alt="film" />
                </div>
                <button type="button" onClick={SaveMovie}>
                  Enregistrer
                </button>
              </fieldset>
            </form>
          )}
        </>
      )}
    </>
  );
};

export default AddMovie;
