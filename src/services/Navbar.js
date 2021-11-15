import React from 'react'
import { Link} from 'react-router-dom';
import '../styles/Navbar.css'
import { Banner } from '../components/Banner';


export const Navbar = () => {
    return (
        <>
            <div className="header">
                <nav className="container-nav">
                        <ul className="list-nav">
                            <li><Link to ="/" className="lien"> Accueil </Link></li>
                            <li> <Link to ="/addmovie" className="lien"> Ajouter un film </Link> </li>
                        </ul>
                </nav>
                <Banner />

            </div>


        </>
    )
}
