import React from 'react'
import logomovie from '../assets/logomovie.jpg'
import { Link} from 'react-router-dom';
import '../styles/Navbar.css'


export const Navbar = () => {
    return (
        <>
            <nav className="container-nav">
                <img src={logomovie} alt="logo de film" width='30px' height='"0px'/>
                <ul className="list-nav">
                    <li><Link to ="/" className="lien"> Accueil </Link></li>
                    <li> <Link to ="/addmovie" className="lien"> Ajouter un film </Link> </li>
                </ul>
            </nav>

        </>
    )
}
