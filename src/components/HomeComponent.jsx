import React from 'react'
import '../css/home.css'
import { Link } from 'react-router-dom';

const HomeComponent = () => {
    return (
        <div className='homepage'>
            {/* Navbar */}
            <nav className='navbar navbar-expand-lg navbar-dark bg-success'>
                <div className="container">
                    <Link className='navbar-brand'>
                    Masomo School</Link>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav'>
  <span className='navbar-toggler-icon'></span>
</button>

                    <div className="collapse navbar-collapse justify-content-end" id='navbarNav'>
                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                                <a href="#about" className="nav-link">About</a>
                            </li>
                             <li className='nav-item'>
                                <a href="#cbc" className="nav-link">CBC Curriculum</a>
                            </li>
                             <li className='nav-item'>
                                <a href="#why-masomo" className="nav-link">Why Us?</a>
                            </li>
                             <li className='nav-item'>
                                <Link className='nav-link' to={'/login'}>Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* here section */}

            <section className='hero position-relative text-white'>
                <img src="images/banner3.jpeg" alt="banner" className='img-fluid w-100' style={{maxHeight: '500px',objectFit: 'cover'}}/>
                <div className='hero-text position-absolute top-50 start-50 translate-middle text-danger bg-dark bg-opacity-50 rounded-3 p-5'>
                    <h1>Empowering Minds, Transforming Lives Through Competence</h1>
                    <p>Welcome to masomo school -nurturing Future Leaders in The Digital Era</p>
                    <a href="#cbc" className="btn btn-primary">Learn More about us  CBC</a>
                </div>
            </section>
        </div>
    );
}

export default HomeComponent
