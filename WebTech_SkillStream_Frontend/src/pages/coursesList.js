import {
  Col,
  Row,
  Button,
  Card,
  CardBody,
  CardTitle,
  Table,
  ButtonGroup,
  Alert,
  Spinner,
  Input,
  InputGroup,
  InputGroupText,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import CustomTable from "../components/customTable";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "../store/apis";

const tableHeaders = [
  {
    key: 1,
    header: "Course title",
  },
  {
    key: 2,
    header: "Course Length",
  },
  {
    key: 3,
    header: "Instructor",
  },
  {
    key: 4,
    header: "Actions",
  },
];

const CoursesList = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.getCourses);
  const { message, loading } = useSelector((state) => state.deletecourse);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(apis.getcourses());
  }, []);

  // Filter courses based on search term
  useEffect(() => {
    if (courses) {
      const filtered = courses.filter((course) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          course.title?.toLowerCase().includes(searchLower) ||
          course.instructor?.toLowerCase().includes(searchLower) ||
          course.length?.toString().toLowerCase().includes(searchLower)
        );
      });
      setFilteredCourses(filtered);
      // Reset to first page when search changes
      setCurrentPage(1);
    }
  }, [courses, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Calculate pagination values
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    await dispatch(apis.deletecourse(courseId));
    dispatch(apis.getcourses());
    
    // Adjust current page if we deleted the last item on the current page
    const newTotalItems = filteredCourses.length - 1;
    const newTotalPages = Math.ceil(newTotalItems / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  console.log(courses);

  return (
    <div>
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Courses</CardTitle>
              <Alert color="success" isOpen={message}>
                {message}
              </Alert>
              
              {/* Search Input */}
              <div className="mb-3">
                <InputGroup>
                  <InputGroupText>
                    <i className="bi bi-search"></i>
                  </InputGroupText>
                  <Input
                    type="text"
                    placeholder="Search courses by title, instructor, or length..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  {searchTerm && (
                    <Button
                      color="secondary"
                      outline
                      onClick={clearSearch}
                      size="sm"
                    >
                      <i className="bi bi-x-lg"></i>
                    </Button>
                  )}
                </InputGroup>
              </div>

              {/* Results count and pagination info */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <small className="text-muted">
                    {searchTerm ? (
                      <>Showing {filteredCourses.length} of {courses?.length || 0} courses</>
                    ) : (
                      <>Total: {filteredCourses.length} courses</>
                    )}
                  </small>
                </div>
                {filteredCourses.length > 0 && (
                  <div>
                    <small className="text-muted">
                      Showing {startIndex + 1}-{Math.min(endIndex, filteredCourses.length)} of {filteredCourses.length} results
                    </small>
                  </div>
                )}
              </div>

              <Table
                className="no-wrap mt-3 align-middle"
                responsive
                borderless
              >
                <thead>
                  <tr>
                    {tableHeaders.map((item, index) => {
                      return <th key={index}>{item.header}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {currentCourses && currentCourses.length > 0 ? (
                    currentCourses.map((course, index) => {
                      return (
                        <tr key={course.id || index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div>
                                <h6 className="mb-0">{course.title}</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-light text-dark">
                              {course.length} hours
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div>
                                <span className="text-muted">{course.instructor}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <ButtonGroup>
                              <Link
                                to={{
                                  pathname: `/dashboard/courses/edit/${course.id}`,
                                  state: { course },
                                }}
                              >
                                <Button
                                  color="success"
                                  size="sm"
                                  onClick={() =>
                                    dispatch(apis.getcourse(course.id))
                                  }
                                  title="Edit Course"
                                >
                                  <i className="bi bi-pencil-fill"></i>
                                </Button>
                              </Link>
                              <Button
                                onClick={() => handleDeleteCourse(course.id)}
                                color="danger"
                                size="sm"
                                title="Delete Course"
                                disabled={loading}
                              >
                                {loading ? (
                                  <Spinner size="sm" />
                                ) : (
                                  <i className="bi bi-trash-fill"></i>
                                )}
                              </Button>
                            </ButtonGroup>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-4">
                        {searchTerm 
                          ? (
                            <div>
                              <i className="bi bi-search mb-2" style={{fontSize: '2rem'}}></i>
                              <p>No courses found matching your search criteria</p>
                              <Button color="link" onClick={clearSearch}>
                                Clear search
                              </Button>
                            </div>
                          ) : (
                            <div>
                              <i className="bi bi-journal-bookmark mb-2" style={{fontSize: '2rem'}}></i>
                              <p>No courses available</p>
                            </div>
                          )
                        }
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div>
                    <small className="text-muted">
                      Page {currentPage} of {totalPages}
                    </small>
                  </div>
                  <Pagination className="mb-0">
                    <PaginationItem disabled={currentPage === 1}>
                      <PaginationLink
                        first
                        onClick={() => handlePageChange(1)}
                        title="First Page"
                      />
                    </PaginationItem>
                    <PaginationItem disabled={currentPage === 1}>
                      <PaginationLink
                        previous
                        onClick={() => handlePageChange(currentPage - 1)}
                        title="Previous Page"
                      />
                    </PaginationItem>
                    
                    {getPageNumbers().map((page, index) => (
                      <PaginationItem key={index} active={page === currentPage}>
                        {page === '...' ? (
                          <PaginationLink disabled>...</PaginationLink>
                        ) : (
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem disabled={currentPage === totalPages}>
                      <PaginationLink
                        next
                        onClick={() => handlePageChange(currentPage + 1)}
                        title="Next Page"
                      />
                    </PaginationItem>
                    <PaginationItem disabled={currentPage === totalPages}>
                      <PaginationLink
                        last
                        onClick={() => handlePageChange(totalPages)}
                        title="Last Page"
                      />
                    </PaginationItem>
                  </Pagination>
                </div>
              )}

              {/* Items per page selector (optional) */}
              {filteredCourses.length > itemsPerPage && (
                <div className="mt-3 text-center">
                  <small className="text-muted">
                    Showing {itemsPerPage} items per page
                  </small>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col lg="12">
          <Button color="primary" className="mt-3">
            <Link
              className="text-decoration-none text-light"
              to="/dashboard/courses/register"
            >
              <i className="bi bi-plus-circle me-2"></i>
              Add course
            </Link>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default CoursesList;