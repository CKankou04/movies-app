import React, {
  useState,
  useEffect,
  useRef,
} from "react";

const AddMovie = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [currentValue, setCurrentValue] = useState('');
  const [movieAd, setMovieAd] = useState(null);
  const titleref = useRef();
  const dateref = useRef();
  const overviewref = useRef();
  const posterref = useRef();
  useEffect(() => {
    if (searchTitle !== "") {
      fetchData();
    }

    console.log('oui oui ')
  }, [searchTitle]);

  // requete pour reccupérer les films selon les mots clés saisis dans le champs via le titre
  const fetchData = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=fb5eca5a2d860a889239aa2f70eae050&query=${searchTitle}`
    );
    const result = await data.json();

    setMovieList(result.results);
  };
  // fonction permettant de recupérer chaque lettre saisi par l'utilisateur pour la recherche d'un nouveau film dans la bd TDMB
  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchTitle(value);
  };
  const AddMovieSearch = async (e) => {
    console.log(e);
    // const id = e.target.id;
    // console.log(id);
    // const moviedata = await fetch(
    //   `https://api.themoviedb.org/3/movie/${id}?api_key=fb5eca5a2d860a889239aa2f70eae050&language=fr-FR`
    // );
    // const response = await moviedata.json();
    // setMovieAd(response);
    // titleref.current.value = response.title;
    // dateref.current.value = response.release_date;
    // overviewref.current.value = response.overview;
    //posterref.current.value = "https://image.tmdb.org/t/p/original"+response.poster_path;
  };

  return (
    <>
      <div>
        <p>Ajouter un film</p>
      </div>
      {movieList && (
        <>
          <form>
            <div>
              <input
                list="list-movie"
                type="text"
                value={currentValue}
                name="list-movie"
                className="search-title"
                onChange={handleSearch}
              />
              {movieList.length > 0 && (
                <datalist id="list-movie">
                  {movieList.map((movie, key) => (
                    <option key={key} value={movie.original_title}  onChange={AddMovieSearch} />
                  ))}
                </datalist>
              )}

              {/* <div id="list-movie">
                            {movieList.map((movie) =>{
                                return(
                                    <form>
                                        <div>

                                        </div>
                                            <span>{movie.original_title} </span>
                                            <span>{movie.release_date}</span>
                                            <button id={movie.id} onClick={AddMovieSearch} type="button">Ajouter</button>

                                    </form>

                                )
                            })}
                        </div> */}
            </div>
          </form>

          <form>
            <div>
              <span>
                <label>Titre</label>
                <input type="text" ref={titleref} />
              </span>
              <span>
                <label>Date de sortie</label>
                <input type="date" ref={dateref} />
              </span>
            </div>
            <div>
              <span>Categorie</span>
              <select>
                <option value="humour">humour</option>
                <option value="humour">aventure</option>
              </select>
            </div>
            <div>
              <input type="text" ref={overviewref} />
            </div>
            <div>
              <input
                type="image"
                width="20px"
                height="20px"
                alt="poster_movie_tnbd"
              />
            </div>
            <div></div>
            <div></div>
          </form>
        </>
      )}
    </>
  );
};

export default AddMovie;
