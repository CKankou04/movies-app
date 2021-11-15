import React from 'react'
import '../styles/Banner.css'
import logo from '../assets/logo.jpg'

export const Banner = () => {
    const title = 'Movie Board'
    return (
        <div className='lmj-banner'>
            <img src={logo} alt='Movie board' className='lmj-logo' />
            <h1 className='lmj-title'>{title}</h1>
        </div>
    )
}
