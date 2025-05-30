import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "../store/apis";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar'; // Added Navbar import

export const Courses = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.getCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [filteredCourses, setFilteredCourses] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  useEffect(() => {
    dispatch(apis.getcourses());
  }, []);

  useEffect(() => {
    if (courses) {
      let filtered = courses;

      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(course =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter by category
      if (selectedCategory !== "All Courses") {
        filtered = filtered.filter(course =>
          course.category === selectedCategory
        );
      }

      setFilteredCourses(filtered);
      setCurrentPage(1); // Reset to first page after filter
    }
  }, [courses, searchTerm, selectedCategory]);

  const handleSearch = () => {
    console.log("Searching for:", searchTerm, "in category:", selectedCategory);
  };

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <>
      {/* Header */}
      <div className="container-fluid bg-dark">
        <div className="row py-2 px-lg-5">
          <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center text-white">
              <small>
                <i className="fa fa-phone-alt mr-2"></i>+250783836604
              </small>
              <small className="px-3">|</small>
              <small>
                <i className="fa fa-envelope mr-2"></i>skillstream@gmail.com
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navbar /> {/* Replaced old navbar with Navbar component */}

      {/* Search Section */}
      <div className="jumbotron jumbotron-fluid bg-primary text-white text-center py-5" style={{ marginBottom: "50px" }}>
        <div className="container">
          <h1 className="display-4 mb-4">Find Your Perfect Course</h1>
          <p className="lead mb-5">Search through our extensive collection of courses</p>

          {/* Search Form */}
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="input-group mb-4">
                <div className="input-group-prepend">
                  <button
                    className="btn btn-outline-light bg-white text-body px-4 dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {selectedCategory}
                  </button>
                  <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={() => setSelectedCategory("All Courses")}>All Courses</button>
                    <button className="dropdown-item" onClick={() => setSelectedCategory("Web Development")}>Web Development</button>
                    <button className="dropdown-item" onClick={() => setSelectedCategory("Design")}>Design</button>
                    <button className="dropdown-item" onClick={() => setSelectedCategory("Marketing")}>Marketing</button>
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control border-0"
                  style={{ padding: "15px 20px" }}
                  placeholder="Search courses, instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="input-group-append">
                  <button className="btn btn-secondary px-4" onClick={handleSearch}>
                    <i className="fa fa-search mr-2"></i>Search
                  </button>
                </div>
              </div>

              {/* Search Results Count */}
              <p className="text-white-50">
                {filteredCourses?.length || 0} courses found
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="container-fluid py-5">
        <div className="container">
          {currentCourses.length > 0 ? (
            <>
              <div className="row">
                {currentCourses.map((item) => (
                  <div key={item.id} className="col-lg-4 col-md-6 pb-4">
                    <Link
                      className="courses-list-item position-relative d-block overflow-hidden mb-2 shadow-sm"
                      to={`/courses/${item.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="card h-100 border-0">
                        <img
                          className="card-img-top"
                          src={item.image || "https://via.placeholder.com/400x250/007bff/ffffff?text=Course+Image"}
                          alt={item.title}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title text-dark">{item.title}</h5>
                          <div className="mt-auto">
                            <div className="d-flex justify-content-between align-items-center">
                              <small className="text-muted">
                                <i className="fa fa-user mr-1"></i>{item.instructor}
                              </small>
                              <small className="text-warning">
                                <i className="fa fa-star mr-1"></i>{item.length} hrs
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-center mt-4">
                <nav>
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                        Previous
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          ) : (
            <div className="text-center py-5">
              <i className="fa fa-search fa-3x text-muted mb-3"></i>
              <h4 className="text-muted">No courses found</h4>
              <p className="text-muted">
                {searchTerm
                  ? `No courses match your search for "${searchTerm}"`
                  : "No courses available at the moment"
                }
              </p>
              {searchTerm && (
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All Courses");
                  }}
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
