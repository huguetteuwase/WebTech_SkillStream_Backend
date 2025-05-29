import {
  Col,
  Row,
  Button,
  Card,
  CardBody,
  CardTitle,
  Table,
  ButtonGroup,
  Spinner,
  Alert,
  Input,
  InputGroup,
  InputGroupText,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge,
} from "reactstrap";
import CustomTable from "../components/customTable";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apis } from "../store/apis";

const tableHeaders = [
  {
    key: 1,
    header: "S/N",
  },
  {
    key: 2,
    header: "Names",
  },
  {
    key: 3,
    header: "Email",
  },
  {
    key: 4,
    header: "Age",
  },
  {
    key: 5,
    header: "Role",
  },
  {
    key: 6,
    header: "Actions",
  },
];

const Users = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { users } = useSelector((state) => state.adminGetUsers);
  const { loading: deletingUser, message } = useSelector(
    (state) => state.deleteUser
  );

  console.log(users);
  
  useEffect(() => {
    dispatch(apis.getusers());
  }, []);

  // Filter users based on search term
  useEffect(() => {
    if (users) {
      const filtered = users.filter((user) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          user.name?.toLowerCase().includes(searchLower) ||
          user.email?.toLowerCase().includes(searchLower) ||
          user.role?.toLowerCase().includes(searchLower) ||
          user.age?.toString().toLowerCase().includes(searchLower) ||
          user.id?.toString().toLowerCase().includes(searchLower)
        );
      });
      setFilteredUsers(filtered);
      // Reset to first page when search changes
      setCurrentPage(1);
    }
  }, [users, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Calculate pagination values
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

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

  const handleDeleteUser = async (userId) => {
    await dispatch(apis.deleteUser(userId));
    dispatch(apis.getusers());
    
    // Adjust current page if we deleted the last item on the current page
    const newTotalItems = filteredUsers.length - 1;
    const newTotalPages = Math.ceil(newTotalItems / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'danger';
      case 'instructor':
        return 'warning';
      case 'student':
        return 'primary';
      default:
        return 'secondary';
    }
  };

  return (
    <div>
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Users Management</CardTitle>
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
                    placeholder="Search users by name, email, role, age, or ID..."
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
                      <>Showing {filteredUsers.length} of {users?.length || 0} users</>
                    ) : (
                      <>Total: {filteredUsers.length} users</>
                    )}
                  </small>
                </div>
                {filteredUsers.length > 0 && (
                  <div>
                    <small className="text-muted">
                      Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} results
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
                  {currentUsers && currentUsers.length > 0 ? (
                    currentUsers.map((user, index) => {
                      const globalIndex = startIndex + index + 1;
                      return (
                        <tr key={user.id || index}>
                          <td>
                            <div className="d-flex align-items-center p-2">
                              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" 
                                   style={{width: '40px', height: '40px'}}>
                                <strong className="text-primary">{globalIndex}</strong>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" 
                                   style={{width: '35px', height: '35px'}}>
                                <span className="text-white fw-bold">
                                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                </span>
                              </div>
                              <div>
                                <h6 className="mb-0">{user.name}</h6>
                                <small className="text-muted">ID: {user.id}</small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>
                              <span className="fw-normal">{user.email}</span>
                            </div>
                          </td>
                          <td>
                            <Badge color="light" className="text-dark">
                              {user.age} years
                            </Badge>
                          </td>
                          <td>
                            <Badge color={getRoleBadgeColor(user.role)}>
                              {user.role?.charAt(0)?.toUpperCase() + user.role?.slice(1) || 'Unknown'}
                            </Badge>
                          </td>
                          <td>
                            <ButtonGroup>
                              {/* Uncomment when edit functionality is ready */}
                              {/* <Link
                                to={{
                                  pathname: `/dashboard/editUser/${user.id}`,
                                  state: { user },
                                }}
                              >
                                <Button color="success" size="sm" title="Edit User">
                                  <i className="bi bi-pencil-fill"></i>
                                </Button>
                              </Link> */}
                              <Button
                                onClick={() => handleDeleteUser(user.id)}
                                color="danger"
                                size="sm"
                                title="Delete User"
                                disabled={deletingUser}
                              >
                                {deletingUser ? (
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
                      <td colSpan="6" className="text-center text-muted py-4">
                        {searchTerm 
                          ? (
                            <div>
                              <i className="bi bi-search mb-2" style={{fontSize: '2rem'}}></i>
                              <p>No users found matching your search criteria</p>
                              <Button color="link" onClick={clearSearch}>
                                Clear search
                              </Button>
                            </div>
                          ) : (
                            <div>
                              <i className="bi bi-people mb-2" style={{fontSize: '2rem'}}></i>
                              <p>No users available</p>
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

              {/* Items per page info */}
              {filteredUsers.length > itemsPerPage && (
                <div className="mt-3 text-center">
                  <small className="text-muted">
                    Showing {itemsPerPage} users per page
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
              to="/dashboard/users/register"
            >
              <i className="bi bi-person-plus me-2"></i>
              Add user
            </Link>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Users;