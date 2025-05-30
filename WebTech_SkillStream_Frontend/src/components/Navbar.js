import React, { useState, useEffect } from 'react';
import { Link, useNavigate } // Removed NavLink for now as per thought process
from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import user1 from "../assets/images/user1.jpg"; // Assuming this is a placeholder

const Navbar = () => {
  // Initialize user state from localStorage, ensuring it defaults to an empty object if null
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : {};
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleLogout = () => {
    localStorage.clear();
    setUser({}); // Clear user state in the component
    navigate("/login"); // Navigate to login
  };
  
  // Effect to listen to storage changes (e.g., for multi-tab scenarios or external localStorage changes)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'user') {
        setUser(event.newValue ? JSON.parse(event.newValue) : {});
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Effect to update user state if localStorage is cleared by other means (e.g. dev tools)
  // This ensures component reacts if 'user' item is removed.
  useEffect(() => {
    const interval = setInterval(() => {
        const currentUser = localStorage.getItem('user');
        if (!currentUser && Object.keys(user).length !== 0) { // If localStorage cleared and user state not empty
            setUser({});
        } else if (currentUser && JSON.stringify(user) !== currentUser) { // If localStorage changed
            setUser(JSON.parse(currentUser));
        }
    }, 1000); // Check every second
    return () => clearInterval(interval);
  }, [user]);


  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5">
        <Link to="/" className="navbar-brand ml-lg-3">
          <h1 className="m-0 text-uppercase text-primary">
            <i className="fa fa-book-reader mr-3"></i>SkillStream
          </h1>
        </Link>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse" // Added for accessibility
          aria-expanded="false" // Added for accessibility
          aria-label="Toggle navigation" // Added for accessibility
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between px-lg-3"
          id="navbarCollapse"
        >
          <div className="navbar-nav mx-auto py-0">
            {/* For NavLink, you'd use: <NavLink to="/" className={({isActive}) => isActive ? "nav-item nav-link active" : "nav-item nav-link"}>Home</NavLink> */}
            <Link to="/" className="nav-item nav-link active">Home</Link> 
            <Link to="/about" className="nav-item nav-link">About</Link>
            <Link to="/courses" className="nav-item nav-link">Courses</Link>
            {user && user.role === 'admin' && (
              <Link to="/dashboard" className="nav-item nav-link">Admin Dashboard</Link>
            )}
          </div>
          {user && user.token ? ( // Check for token or a more specific property indicating logged-in state
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle color="primary" caret> {/* caret adds the dropdown arrow, color="primary" is an example */}
                <img
                  src={user1} // Replace with actual user avatar if available, or a default icon
                  alt="profile"
                  className="rounded-circle mr-1" // Added margin for spacing
                  width="30"
                  height="30" // Ensure height is also set for consistency
                />
                {/* Optionally display user name or email if no image, or as a fallback */}
                {/* {user.name || user.email} */}
              </DropdownToggle>
              <DropdownMenu right> {/* Using 'right' prop for right alignment, ensure it works with your reactstrap version or use 'end' for BS5 */}
                <DropdownItem header>{user.name || user.email || 'User Profile'}</DropdownItem>
                <DropdownItem divider />
                {/* Add other links like Profile page if you have one */}
                {/* <Link to="/profile" className="dropdown-item">Profile</Link> */}
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Link
              className="btn btn-primary py-2 px-4 d-none d-lg-block"
              to="/login"
            >
              Join Us
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
