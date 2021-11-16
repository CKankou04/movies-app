import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router';


const UpdateMovie = () => {
    const { id} = useParams();
    const [movieDetail, setMovieDetail] = useState('');


    // on récupère les données du film à modifier
    useEffect(() => {
       fetchMovie();
      }, []);

      const fetchMovie = async () => {
    const data = await fetch(
      `http://localhost:3000/movies/${id}`, {
          method: "PUT",
      }
    );
    const result = await data.json();
    setMovieDetail(result);
  };
    return (

        <div>
            <form className="form_new_movie">
              <fieldset className="card_new_movie">
                <legend className="legend">Modification d'un film</legend>
                <div className="title_and_date">
                  <span>
                    <label>Titre:</label>
                    <input type="text"
                        name="title"
                        defaultValue={ movieDetail.title }
                        required />
                  </span>
                  <span>
                    <label>Date de sortie:</label>
                    <input type="date" name="date" defaultValue={ movieDetail.release_date } required />
                  </span>
                </div>
                <div className="categories_new_movie">
                  <span>Categorie</span>
                  <select >
                    <option value="humour">humour</option>
                    <option value="humour">aventure</option>
                  </select>
                </div>
                <div className="description_new_movie">
                  <label>Descritiopn:</label>
                  <input
                    type="textarea"

                    className="new_desc"
                  />
                </div>
                <div>
                  <label>Poster de film</label>
                  <input
                    type="url"
                    width="20px"
                    height="20px"
                    alt="poster_movie_tnbd"

                  />
                </div>
                <div>
                  <h3>Les acteurs du film</h3>
                  <div>
                    <label>Image</label>
                    <input type="text" alt="poster_acteurs" />
                  </div>
                  <div>
                    <label>Nom de l'acteur</label>
                    <input type="text" alt="nom_acteur" />
                  </div>
                </div>
                <div>
                  <h3>Les films similaires</h3>
                  <input type="text" alt="film" />
                </div>
                <button type="button" >
                  Enregistrer
                </button>
              </fieldset>
            </form>
        </div>
    )
}

export default UpdateMovie;