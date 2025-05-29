import { Link, useParams } from "react-router-dom";
import headeimg from "../assets/images/header.jpg";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { apis } from "../store/apis";
import {
  Alert,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import user1 from "../assets/images/user1.jpg";

export const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const { course } = useSelector((state) => state.getCourse);
  const { message, error } = useSelector((state) => state.createEnrollment);

  useEffect(() => {
    dispatch(apis.getcourse(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (message || error) {
      setTimeout(() => {
        dispatch(apis.resetAll());
        window.location.href = "/courses";
      }, 2000);
    }
  }, [message, error, dispatch]);

  return (
    <>
      <div className="container-fluid bg-dark">
        <div className="row py-2 px-lg-5">
          <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center text-white">
              <small>
                <i className="fa fa-phone-alt mr-2"></i>+012 345 6789
              </small>
              <small className="px-3">|</small>
              <small>
                <i className="fa fa-envelope mr-2"></i>info@example.com
              </small>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <a className="text-white px-2" href="#"><i className="fab fa-facebook-f"></i></a>
              <a className="text-white px-2" href="#"><i className="fab fa-twitter"></i></a>
              <a className="text-white px-2" href="#"><i className="fab fa-linkedin-in"></i></a>
              <a className="text-white px-2" href="#"><i className="fab fa-instagram"></i></a>
              <a className="text-white pl-2" href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5">
          <Link to="/" className="navbar-brand ml-lg-3">
            <h1 className="m-0 text-uppercase text-primary">
              <i className="fa fa-book-reader mr-3"></i>SkillStream
            </h1>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between px-lg-3" id="navbarCollapse">
            <div className="navbar-nav mx-auto py-0">
              <Link to="/" className="nav-item nav-link">Home</Link>
              <Link to="/about" className="nav-item nav-link">About</Link>
              <Link to="/courses" className="nav-item nav-link">Courses</Link>
            </div>
            {localStorage.getItem("useremail") ? (
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle color="primary">
                  <img src={user1} alt="profile" className="rounded-circle" width="30" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/login";
                    }}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Link to="/login" className="btn btn-primary py-2 px-4 d-none d-lg-block">
                Join Us
              </Link>
            )}
          </div>
        </nav>
      </div>

      <div
        className="jumbotron jumbotron-fluid page-header position-relative overlay-bottom"
        style={{ marginBottom: "90px" }}
      >
        <div className="container text-center py-5">
          <h1 className="text-white display-1">Course Detail</h1>
          <div className="d-inline-flex text-white mb-5">
            <p className="m-0 text-uppercase"><Link className="text-white" to="/">Home</Link></p>
            <i className="fa fa-angle-double-right pt-1 px-3"></i>
            <p className="m-0 text-uppercase">Course Detail</p>
          </div>
          <div className="mx-auto mb-5" style={{ maxWidth: "600px", width: "100%" }}>
            <div className="input-group">
              <div className="input-group-prepend">
                <button
                  className="btn btn-outline-light bg-white text-body px-4 dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Courses
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">Courses 1</a>
                  <a className="dropdown-item" href="#">Courses 2</a>
                  <a className="dropdown-item" href="#">Courses 3</a>
                </div>
              </div>
              <input
                type="text"
                className="form-control border-light"
                style={{ padding: "30px 25px" }}
                placeholder="Keyword"
              />
              <div className="input-group-append">
                <button className="btn btn-secondary px-4 px-lg-5">Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-8">
              <div className="mb-5">
                <div className="section-title position-relative mb-5">
                  <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
                    Course Detail
                  </h6>
                  <h1 className="display-4">{course.title && course.title.toUpperCase()}</h1>
                </div>
                <img className="img-fluid rounded w-100 mb-4" src={headeimg} alt="Header" />
              </div>
            </div>

            <div className="col-lg-4 mt-5 mt-lg-0">
              <div className="bg-primary mb-5 py-3">
                <h3 className="text-white py-3 px-4 m-0">Course Features</h3>
                <div className="d-flex justify-content-between border-bottom px-4">
                  <h6 className="text-white my-3">Instructor</h6>
                  <h6 className="text-white my-3">{course.instructor}</h6>
                </div>
                <div className="d-flex justify-content-between border-bottom px-4">
                  <h6 className="text-white my-3">Rating</h6>
                  <h6 className="text-white my-3">4.5 <small>(250)</small></h6>
                </div>
                <div className="d-flex justify-content-between border-bottom px-4">
                  <h6 className="text-white my-3">Lectures</h6>
                  <h6 className="text-white my-3">{course.modules?.length}</h6>
                </div>
                <div className="d-flex justify-content-between border-bottom px-4">
                  <h6 className="text-white my-3">Duration</h6>
                  <h6 className="text-white my-3">{course.length}</h6>
                </div>
                <div className="d-flex justify-content-between border-bottom px-4">
                  <h6 className="text-white my-3">Skill level</h6>
                  <h6 className="text-white my-3">All Level</h6>
                </div>
                <div className="d-flex justify-content-between px-4">
                  <h6 className="text-white my-3">Language</h6>
                  <h6 className="text-white my-3">English</h6>
                </div>
                <h5 className="text-white py-3 px-4 m-0">Course Price: $199</h5>
                <div className="py-3 px-4">
                  {error && <Alert color="danger">{error}</Alert>}
                  {message && <Alert color="success">{message}</Alert>}
                  <Button
                    className="btn btn-block btn-secondary py-3 px-5"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(
                        apis.createEnrollment({
                          course: course.title,
                          userEmail: localStorage.getItem("useremail"),
                        })
                      );
                    }}
                  >
                    Enroll Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
