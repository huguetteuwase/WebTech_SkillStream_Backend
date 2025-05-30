import React from 'react';
import Navbar from '../components/Navbar';
// Import Link if you intend to convert other <a> tags to <Link> later
// import { Link } from 'react-router-dom'; 

export const About = () => {
  return (
    <div className="about-page"> {/* Replaced <body> with <div> */}
      <div className="container-fluid bg-dark"> {/* Changed class to className */}
        <div className="row py-2 px-lg-5"> {/* Changed class to className */}
          <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0"> {/* Changed class to className */}
            <div className="d-inline-flex align-items-center text-white"> {/* Changed class to className */}
              <small>
                <i className="fa fa-phone-alt mr-2"></i>+250783836604 {/* Changed class to className */}
              </small>
              <small className="px-3">|</small>
              <small>
                <i className="fa fa-envelope mr-2"></i>skillstream@gmail.com {/* Changed class to className */}
              </small>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right"> {/* Changed class to className */}
            <div className="d-inline-flex align-items-center"> {/* Changed class to className */}
              <a className="text-white px-2" href=""> {/* Changed class to className */}
                <i className="fab fa-facebook-f"></i> {/* Changed class to className */}
              </a>
              <a className="text-white px-2" href=""> {/* Changed class to className */}
                <i className="fab fa-twitter"></i> {/* Changed class to className */}
              </a>
              <a className="text-white px-2" href=""> {/* Changed class to className */}
                <i className="fab fa-linkedin-in"></i> {/* Changed class to className */}
              </a>
              <a className="text-white px-2" href=""> {/* Changed class to className */}
                <i className="fab fa-instagram"></i> {/* Changed class to className */}
              </a>
              <a className="text-white pl-2" href=""> {/* Changed class to className */}
                <i className="fab fa-youtube"></i> {/* Changed class to className */}
              </a>
            </div>
          </div>
        </div>
      </div>

      <Navbar /> {/* Replaced old navbar with Navbar component */}

      <div
        className="jumbotron jumbotron-fluid page-header position-relative overlay-bottom" // Changed class to className
        style={{
          marginBottom: "90px",
        }}
      >
        <div className="container text-center py-5"> {/* Changed class to className */}
          <h1 className="text-white display-1">About</h1> {/* Changed class to className */}
          <div className="d-inline-flex text-white mb-5"> {/* Changed class to className */}
            <p className="m-0 text-uppercase"> {/* Changed class to className */}
              <a className="text-white" href=""> {/* Changed class to className */}
                Home
              </a>
            </p>
            <i className="fa fa-angle-double-right pt-1 px-3"></i> {/* Changed class to className */}
            <p className="m-0 text-uppercase">About</p> {/* Changed class to className */}
          </div>
          <div
            className="mx-auto mb-5" // Changed class to className
            style={{
              width: "100%",
              maxWidth: "600px",
            }}
          >
            <div className="input-group"> {/* Changed class to className */}
              <div className="input-group-prepend"> {/* Changed class to className */}
                <button
                  className="btn btn-outline-light bg-white text-body px-4 dropdown-toggle" // Changed class to className
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Courses
                </button>
                <div className="dropdown-menu"> {/* Changed class to className */}
                  <a className="dropdown-item" href="#"> {/* Changed class to className */}
                    Courses 1
                  </a>
                  <a className="dropdown-item" href="#"> {/* Changed class to className */}
                    Courses 2
                  </a>
                  <a className="dropdown-item" href="#"> {/* Changed class to className */}
                    Courses 3
                  </a>
                </div>
              </div>
              <input
                type="text"
                className="form-control border-light" // Changed class to className
                style={{
                  padding: "30px 25px",
                }}
                placeholder="Keyword"
              />
              <div className="input-group-append"> {/* Changed class to className */}
                <button className="btn btn-secondary px-4 px-lg-5">Search</button> {/* Changed class to className */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5"> {/* Changed class to className */}
        <div className="container py-5"> {/* Changed class to className */}
          <div className="row"> {/* Changed class to className */}
            <div
              className="col-lg-5 mb-5 mb-lg-0" // Changed class to className
              style={{
                minHeight: "500px",
              }}
            >
              <div className="position-relative h-100"> {/* Changed class to className */}
                <img
                  className="position-absolute w-100 h-100" // Changed class to className
                  src="img/about.jpg"
                  style={{
                    objectFit: "cover",
                  }}
                  alt="About Us Background" // Added alt text
                />
              </div>
            </div>
            <div className="col-lg-7"> {/* Changed class to className */}
              <div className="section-title position-relative mb-4"> {/* Changed class to className */}
                <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2"> {/* Changed class to className */}
                  About Us
                </h6>
                <h1 className="display-4"> {/* Changed class to className */}
                  First Choice For Online Education Anywhere
                </h1>
              </div>
              <p>
              Welcome to SkillStream!
              We are passionate about providing high-quality education to everyone, regardless of their location or background.
              Our platform offers a wide range of courses taught by experienced instructors, and we are committed to helping our
              students achieve their goals. Whether you’re looking to learn a new skill, advance your career, or simply explore new
              subjects, we have something for you. Join us today and start your learning journey!
                
              </p>
              <div className="row pt-3 mx-0"> {/* Changed class to className */}
                <div className="col-3 px-0"> {/* Changed class to className */}
                  <div className="bg-success text-center p-4"> {/* Changed class to className */}
                    <h1 className="text-white" data-toggle="counter-up"> {/* Changed class to className */}
                      123
                    </h1>
                    <h6 className="text-uppercase text-white"> {/* Changed class to className */}
                      Available<span className="d-block">Subjects</span> {/* Changed class to className */}
                    </h6>
                  </div>
                </div>
                <div className="col-3 px-0"> {/* Changed class to className */}
                  <div className="bg-primary text-center p-4"> {/* Changed class to className */}
                    <h1 className="text-white" data-toggle="counter-up"> {/* Changed class to className */}
                      1234
                    </h1>
                    <h6 className="text-uppercase text-white"> {/* Changed class to className */}
                      Online<span className="d-block">Courses</span> {/* Changed class to className */}
                    </h6>
                  </div>
                </div>
                <div className="col-3 px-0"> {/* Changed class to className */}
                  <div className="bg-secondary text-center p-4"> {/* Changed class to className */}
                    <h1 className="text-white" data-toggle="counter-up"> {/* Changed class to className */}
                      123
                    </h1>
                    <h6 className="text-uppercase text-white"> {/* Changed class to className */}
                      Skilled<span className="d-block">Instructors</span> {/* Changed class to className */}
                    </h6>
                  </div>
                </div>
                <div className="col-3 px-0"> {/* Changed class to className */}
                  <div className="bg-warning text-center p-4"> {/* Changed class to className */}
                    <h1 className="text-white" data-toggle="counter-up"> {/* Changed class to className */}
                      1234
                    </h1>
                    <h6 className="text-uppercase text-white"> {/* Changed class to className */}
                      Happy<span className="d-block">Students</span> {/* Changed class to className */}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5"> {/* Changed class to className */}
        <div className="container py-5"> {/* Changed class to className */}
          <div className="row"> {/* Changed class to className */}
            <div className="col-lg-7 mb-5 mb-lg-0"> {/* Changed class to className */}
              <div className="section-title position-relative mb-4"> {/* Changed class to className */}
                <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2"> {/* Changed class to className */}
                  Why Choose Us?
                </h6>
                <h1 className="display-4"> {/* Changed class to className */}
                  Why You Should Start Learning with Us?
                </h1>
              </div>
              <p className="mb-4 pb-2"> {/* Changed class to className */}
              At SkillStream, we are passionate about providing high-quality education to everyone,
              regardless of their location or background. Our platform offers a wide range of courses
              taught by experienced instructors, and we are committed to helping our students achieve
              their goals. Whether you’re looking to learn a new skill, advance your career, or simply
              explore new subjects, we have something for you. Join us today and start your learning journey!
               
              </p>
              <div className="d-flex mb-3"> {/* Changed class to className */}
                <div className="btn-icon bg-primary mr-4"> {/* Changed class to className */}
                  <i className="fa fa-2x fa-graduation-cap text-white"></i> {/* Changed class to className */}
                </div>
                <div className="mt-n1"> {/* Changed class to className */}
                  <h4>Skilled Instructors</h4>
                  <p>
                  On SkillStream, we are committed to providing high-quality education to everyone, regardless of their location or background. Our courses are taught by experienced instructors who are passionate about sharing their knowledge and expertise with others.  
                  </p>
                </div>
              </div>
              <div className="d-flex mb-3"> {/* Changed class to className */}
                <div className="btn-icon bg-secondary mr-4"> {/* Changed class to className */}
                  <i className="fa fa-2x fa-certificate text-white"></i> {/* Changed class to className */}
                </div>
                <div className="mt-n1"> {/* Changed class to className */}
                  <h4>International Certificate</h4>
                  <p>
                  SkillStream offers a range of certificate programs that are designed to help you achieve your career goals. Our certificate programs are taught by experienced instructors who are passionate about sharing their knowledge and expertise with others. 
                  </p>
                </div>
              </div>
              <div className="d-flex"> {/* Changed class to className */}
                <div className="btn-icon bg-warning mr-4"> {/* Changed class to className */}
                  <i className="fa fa-2x fa-book-reader text-white"></i> {/* Changed class to className */}
                </div>
                <div className="mt-n1"> {/* Changed class to className */}
                  <h4>Online Classes</h4>
                  <p className="m-0"> {/* Changed class to className */}
                  A variety of certificate programs from SkillStream are available to assist you in reaching your professional objectives. Our certificate programs are delivered by knowledgeable educators who have a strong desire to impart their skills and knowledge to others. 
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-5" // Changed class to className
              style={{
                minHeight: "500px",
              }}
            >
              <div className="position-relative h-100"> {/* Changed class to className */}
                <img
                  className="position-absolute w-100 h-100" // Changed class to className
                  src="img/feature.jpg"
                  style={{
                    objectFit: "cover",
                  }}
                  alt="Feature Background" // Added alt text
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container-fluid position-relative overlay-top bg-dark text-white-50 py-5" // Changed class to className
        style={{
          marginTop: "90px",
        }}
      >
        <div className="container mt-5 pt-5"> {/* Changed class to className */}
          <div className="row"> {/* Changed class to className */}
            <div className="col-md-6 mb-5"> {/* Changed class to className */}
              <a href="/" className="navbar-brand"> {/* Changed class to className */}
                <h1 className="mt-n2 text-uppercase text-white"> {/* Changed class to className */}
                  <i className="fa fa-book-reader mr-3"></i>SkillStream {/* Changed class to className */}
                </h1>
              </a>
              <p className="m-0"> {/* Changed class to className */}
              On SkillStream, we are committed to providing high-quality education to everyone, regardless of their location or background. Our courses are taught by experienced instructors who are passionate about sharing their knowledge and expertise with others. Our instructors are highly skilled and knowledgeable in their respective fields, and they are dedicated to helping our students achieve their goals. 
              
              </p>
            </div>
            <div className="col-md-6 mb-5"> {/* Changed class to className */}
              <h3 className="text-white mb-4">Newsletter</h3> {/* Changed class to className */}
              <div className="w-100"> {/* Changed class to className */}
                <div className="input-group"> {/* Changed class to className */}
                  <input
                    type="text"
                    className="form-control border-light" // Changed class to className
                    style={{
                      padding: "30px",
                    }}
                    placeholder="Your Email Address"
                  />
                  <div className="input-group-append"> {/* Changed class to className */}
                    <button className="btn btn-primary px-4">Sign Up</button> {/* Changed class to className */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row"> {/* Changed class to className */}
            <div className="col-md-4 mb-5"> {/* Changed class to className */}
              <h3 className="text-white mb-4">Get In Touch</h3> {/* Changed class to className */}
              <p>
                <i className="fa fa-map-marker-alt mr-2"></i>Kimihurura, Kigali, Rwanda {/* Changed class to className */}
              </p>
              <p>
                <i className="fa fa-phone-alt mr-2"></i>+250783836604 {/* Changed class to className */}
              </p>
              <p>
                <i className="fa fa-envelope mr-2"></i>skillstream@gmail.com {/* Changed class to className */}
              </p>
              <div className="d-flex justify-content-start mt-4"> {/* Changed class to className */}
                <a className="text-white mr-4" href="#"> {/* Changed class to className */}
                  <i className="fab fa-2x fa-twitter"></i> {/* Changed class to className */}
                </a>
                <a className="text-white mr-4" href="#"> {/* Changed class to className */}
                  <i className="fab fa-2x fa-facebook-f"></i> {/* Changed class to className */}
                </a>
                <a className="text-white mr-4" href="#"> {/* Changed class to className */}
                  <i className="fab fa-2x fa-linkedin-in"></i> {/* Changed class to className */}
                </a>
                <a className="text-white" href="#"> {/* Changed class to className */}
                  <i className="fab fa-2x fa-instagram"></i> {/* Changed class to className */}
                </a>
              </div>
            </div>
            <div className="col-md-4 mb-5"> {/* Changed class to className */}
              <h3 className="text-white mb-4">Our Courses</h3> {/* Changed class to className */}
              <div className="d-flex flex-column justify-content-start"> {/* Changed class to className */}
                <a className="text-white-50 mb-2" href="#"> {/* Changed class to className */}
                  <i className="fa fa-angle-right mr-2"></i>Web Design {/* Changed class to className */}
                </a>
                <a className="text-white-50 mb-2" href="#"> {/* Changed class to className */}
                  <i className="fa fa-angle-right mr-2"></i>Apps Design {/* Changed class to className */}
                </a>
                <a className="text-white-50 mb-2" href="#"> {/* Changed class to className */}
                  <i className="fa fa-angle-right mr-2"></i>Marketing {/* Changed class to className */}
                </a>
                <a className="text-white-50 mb-2" href="#"> {/* Changed class to className */}
                  <i className="fa fa-angle-right mr-2"></i>Research {/* Changed class to className */}
                </a>
                <a className="text-white-50" href="#"> {/* Changed class to className */}
                  <i className="fa fa-angle-right mr-2"></i>SEO {/* Changed class to className */}
                </a>
              </div>
            </div>
            <div className="col-md-4 mb-5"> {/* Changed class to className */}
              <h3 className="text-white mb-4">Quick Links</h3> {/* Changed class to className */}
              <div className="d-flex flex-column justify-content-start"> {/* Changed class to className */}
                <a className="text-white-50 mb-2" href="#"> {/* Changed class to className */}
                  <i className="fa fa-angle-right mr-2"></i>Privacy Policy {/* Changed class to className */}
                </a>
                <a className="text-white-50 mb-2" href="#"> {/* Changed class to className */}
                  <i className="fa fa-angle-right mr-2"></i>Terms & Condition {/* Changed class to className */}
                </a>
                <a className="text-white-50 mb-2" href="#"> {/* Changed class to className */}
                  <i className="fa fa-angle-right mr-2"></i>Regular FAQs {/* Changed class to className */}
                </a>
                <a className="text-white-50 mb-2" href="#"> {/* Changed class to className */}
                  <i className="fa fa-angle-right mr-2"></i>Help & Support {/* Changed class to className */}
                </a>
                <a className="text-white-50" href="#"> {/* Changed class to className */}
                  <i className="fa fa-angle-right mr-2"></i>Contact {/* Changed class to className */}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container-fluid bg-dark text-white-50 border-top py-4" // Changed class to className
        style={{
          borderColor: "rgba(256, 256, 256, .1) !important",
        }}
      >
        <div className="container"> {/* Changed class to className */}
          <div className="row"> {/* Changed class to className */}
            <div className="col-md-6 text-center text-md-left mb-3 mb-md-0"> {/* Changed class to className */}
              <p className="m-0"> {/* Changed class to className */}
                Copyright &copy;{" "}
                <a className="text-white" href="#"> {/* Changed class to className */}
                  SkillStream
                </a>
                . All Rights Reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-right"> {/* Changed class to className */}
              <p className="m-0"> {/* Changed class to className */}
           
              </p>
            </div>
          </div>
        </div>
      </div>
      <a
        href="#"
        className="btn btn-lg btn-primary rounded-0 btn-lg-square back-to-top" // Changed class to className
      >
        <i className="fa fa-angle-double-up"></i> {/* Changed class to className */}
      </a>
    </div>
  );
};
