import React from "react"
import '../css/home.css';
import { Link } from "react-router-dom";

const HomeComponents = () => {
    return (
    <div className="homepage">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container">
                <Link className="navbar-brand" to ={'/'}>Masomo School</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                           <a href="#about" className="nav-link">About</a>
                        </li>
                        <li className="nav-item">
                           <a href="#cbc" className="nav-link">CBC Curriculum</a>
                        </li>
                        <li className="nav-item">
                           <a href="#why-masomo" className="nav-link">Why Us</a>
                        </li>
                        <li className="nav-item">
                           <Link className="nav-link" to ={'login'}>Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        {/* Hero Section */}
        <section className="hero position-relative text-white">
            <img src="images/banner2.jpeg" alt="banner" className="w-100 img-fluid" style={{ maxHeight: '300px', objectFit: 'cover' }} />
            <div className="hero-content position-absolute top-50 start-50 translate-middle text-center bg-dark p-4 rounded bg-opacity-50">
                <h1>Empowering Minds Through Competence</h1>
                <a href="#cbc" className="btn btn-light">Learn more About CBC</a>

            </div>
        </section>
        {/* About Section */}
        <section id="about" className="bg-light py-5">
            <div className="container">
                <h2 className="text-center mb-4 text-success">About Masomo School</h2>
                <p >Masomo School is dedicated to providing quality education that empowers students with the skills and knowledge they need to succeed in a rapidly changing world.</p>
                <p> Our curriculum is designed to foster critical thinking, creativity, and collaboration.</p>
            </div>
        </section>

        {/* CBC Curriculum Section */}
        <section id="cbc" className="py-5">
            <div className="container">
                <h2 className="text-center mb-4 text-success">CBC Curriculum</h2>
                <p>The Competency-Based Curriculum (CBC) is designed to equip learners with the necessary competencies to thrive in the 21st century. It emphasizes practical skills, critical thinking, and creativity.</p>
                <p>At Masomo School, we implement the CBC to ensure our students are well-prepared for future challenges.</p>
                <ul className="list-group list-group-flush mt-3"   >
                    <li className="list-group-item">Focus on Skills & talents</li>
                    <li className="list-group-item">Leaner-Centered Approach</li>
                    <li className="list-group-item">Real-life Problems solving</li>
                    <li className="list-group-item">Continous Assesment</li>
                </ul>
            </div>
        </section>
        {/* Why us section */}
        <section id="why-masomo" className="bg-light py-5">
            <div className="container">
                <h2 className="text-center mb-4 text-success">Why Choose Masomo School?</h2>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <h3 className="card-title">Experienced Teachers</h3>
                                    <p className="card-text">Our Educators are trained in CBC and commited to student growth</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <h3 className="card-title">Mordern Facilities</h3>
                                    <p className="card-text">We provide state of the art labs, libraries and learning spaces</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <h3 className="card-title">Co-Curricular Activities</h3>
                                    <p className="card-text">Students explore sports, arts, tech and leadership beyond books</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* contact section */}
        <section id="contact" className="text-center py-5">
            <div className="container">
                <h2 className="text-success">Join Masomo School Today</h2>
                <p>Enroll your child in a school that builds future-ready citizens</p>
                <a href="/register" className="btn btn-success">Apply Now</a>
            </div>
        </section>

        {/* footer */}
        <footer className="bg-dark text-light text-center py-3">
            <p className="mb-0">&copy; {new Date().getFullYear()}Masomo School. All Rights Reserved</p>
        </footer>
    </div>
    )
}

export default HomeComponents