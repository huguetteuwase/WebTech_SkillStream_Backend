import React, { useState, useEffect } from 'react';
import { Star, Award, Search, Send, CheckCircle, AlertCircle, User, BookOpen } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080';

const SkillStreamApp = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [currentUser, setCurrentUser] = useState({ email: 'user@example.com', name: 'John Doe' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
    fetchReviews();
    fetchCertificates();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/courses`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/enrollment`);
      const data = await response.json();
      setEnrollments(data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchCertificates = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/certificates`);
      const data = await response.json();
      setCertificates(data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  const showMessage = (msg, type = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(''), 3000);
  };

  const enrollInCourse = async (courseTitle) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/enrollment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: currentUser.email, course: courseTitle })
      });
      if (response.ok) {
        showMessage('Enrolled successfully!');
        fetchEnrollments();
      } else {
        const error = await response.text();
        showMessage(error, 'error');
      }
    } catch (error) {
      showMessage('Enrollment failed', 'error');
    }
    setLoading(false);
  };

  const completeCourse = async (enrollmentId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/enrollment/complete/${enrollmentId}`, { method: 'PATCH' });
      if (response.ok) {
        showMessage('Course marked as completed!');
        fetchEnrollments();
      } else {
        showMessage('Failed to complete course', 'error');
      }
    } catch (error) {
      showMessage('Failed to complete course', 'error');
    }
    setLoading(false);
  };

  const issueCertificate = async (enrollmentId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/certificates/issue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentId, completionDate: new Date().toISOString() })
      });
      if (response.ok) {
        const result = await response.text();
        showMessage(result);
        fetchCertificates();
      } else {
        const error = await response.text();
        showMessage(error, 'error');
      }
    } catch (error) {
      showMessage('Failed to issue certificate', 'error');
    }
    setLoading(false);
  };

  return <div>SkillStreamApp Core Setup</div>;
};

export default SkillStreamApp;
