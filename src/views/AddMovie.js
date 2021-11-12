import React,{useState, useEffect} from 'react'

 const AddMovie = () => {
    const [movieList, setMovieList] = useState([]);
    const [searchTitle, setSearchTitle] = useState('')
    useEffect(() => {
        if(searchTitle!==''){
            fetchData();
        }

    }, [searchTitle]);

    console.log(movieList)

    const fetchData = async () => {
      const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=fb5eca5a2d860a889239aa2f70eae050&query=${searchTitle}`);
      const result = await data.json();

      setMovieList(result.results);
    };
    const handleSearch = (e) =>{
        let value = e.target.value;
        setSearchTitle(value)
    };
    const AddMovieSearch = () =>{

    }
    return (
        <>
            <div>
                <p>Ajouter un film</p>
            </div>
            {movieList && (
                <form>
                    <div>
                        <input type="text" name="list-movie" className="search-title" onChange={handleSearch} />
                        <input list="list-movie" type="date" name="date-release" className="date-release" />
                        <div id="list-movie">
                            {movieList.map((movie) =>{
                                return(
                                    <form>
                                        <img  src={movie.poster_path} alt="poster de film" width="10rem" />
                                        <div>
                                            <p>{movie.original_title} </p>
                                            <p>{movie.release_date}</p>
                                        </div>
                                        <div>
                                            <button onClick={AddMovieSearch}>Ajouter</button>
                                        </div>


                                    </form>

                                )
                            })}
                        </div>
                    </div>


                </form>
            )}
        </>
    );
}

export default AddMovie;
