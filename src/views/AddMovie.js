import React from 'react'

 const AddMovie = () => {
    return (
        <>
            <div>
                <p>Ajouter un film</p>
            </div>
            <form>
                <div>
                    <input type="text" name="title" className="search-title" />
                    <input type="date" name="date-release" className="date-release" />
                </div>
                <div>
                    <label for="list-movie">Choose a flavor:</label>
                    <input list="list-movie" id="ice-cream-choice" name="ice-cream-choice" />
                    <datalist id="list-movie">
                        <option value=""></option>

                    </datalist>
                </div>

            </form>
        </>
    )
}

export default AddMovie;
