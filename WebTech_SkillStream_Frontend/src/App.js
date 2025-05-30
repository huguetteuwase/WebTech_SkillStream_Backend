import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HomePage } from "./pages/Homepage";
import { About } from "./pages/About";
import { Courses } from "./pages/Courses";
import { Details } from "./pages/Details";
import { Login } from "./pages/Login";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import CoursesList from "./pages/coursesList";
import { Provider } from "react-redux";
import { store } from "./store";
import EnrollmentsList from "./pages/enrollments";
import RegisterUser from "./pages/registerUser";
import RegisterCourse from "./pages/registerCourse";
import { ToastContainer } from "react-toastify";
import EditCourse from "./pages/editCourse";
import AdminUsers from "./pages/adminUsers";
import React from "react";

// Import the ProtectedRoute component
import ProtectedRoute from "./components/ProtectedRoute"; // Adjust the path if your ProtectedRoute.jsx is in a different location (e.g., './utils/ProtectedRoute')


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          {/* Global Toast Notification Container */}
          <ToastContainer />

          <Routes>
            {/* Public Routes - Accessible to everyone */}
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
            <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
            <Route path="/courses/:id" element={<Details />} />
            <Route path="/login" element={<Login />} />

            {/*
              Protected Routes:
              These routes will only be accessible if the user is authenticated.
              The ProtectedRoute component handles the redirection if the user is not logged in.
            */}

            {/* Dashboard and its nested routes are protected */}
            <Route
              path="/dashboard/*" // Use /* to match all nested paths under /dashboard
              element={
                <ProtectedRoute adminOnly={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              {/* Nested routes for the Dashboard */}
              <Route index element={<Navigate to="courses" replace />} /> {/* Redirects /dashboard to /dashboard/courses */}

              {/* Course Management */}
              <Route path="courses" element={<CoursesList />} />
              <Route path="courses/register" element={<RegisterCourse />} />
              <Route path="courses/edit/:id" element={<EditCourse />} />

              {/* User Management */}
              <Route path="users" element={<Users />} />
              <Route path="users/register" element={<RegisterUser />} />

              {/* Enrollment Management */}
              <Route path="enrollments" element={<EnrollmentsList />} />
            </Route>

            {/*
              Admin-Only Route:
              The /users route (which renders AdminUsers) is protected and
              requires the user to have an 'admin' role.
            */}
            <Route
              path="/users"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route for any undefined paths, redirects to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;