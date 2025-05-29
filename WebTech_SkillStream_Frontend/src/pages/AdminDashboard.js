import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  UserPlus, 
  Trash2, 
  Search, 
  Plus, 
  Edit3, 
  Shield, 
  BarChart3, 
  Settings,
  Menu,
  X,
  Eye,
  TrendingUp,
  UserCheck,
  GraduationCap
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCourses();
    loadUsers();
  }, []);

  const loadCourses = async () => {
    try {
      setCourses([
        { id: 1, title: 'Advanced React Development', students: 234, status: 'Active' },
        { id: 2, title: 'Machine Learning Basics', students: 189, status: 'Active' },
        { id: 3, title: 'UI/UX Design Principles', students: 156, status: 'Draft' }
      ]);
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const loadUsers = async () => {
    try {
      setUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Instructor', status: 'Active' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Student', status: 'Inactive' }
      ]);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleCreateCourse = async () => {
    alert('Create Course - Connect your createCourse API here');
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        alert(`Delete Course ID: ${courseId} - Connect your deleteCourse API here`);
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const handleUpdateCourse = async (courseId) => {
    try {
      alert(`Update Course ID: ${courseId} - Connect your updateCourse API here`);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        alert(`Delete User ID: ${userId} - Connect your deleteUser API here`);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSearchCourses = async (searchTerm) => {
    try {
      alert(`Search for: ${searchTerm} - Connect your searchCourse API here`);
    } catch (error) {
      console.error('Error searching courses:', error);
    }
  };

  const handleVerifyCode = async (code) => {
    try {
      alert(`Verify Code: ${code} - Connect your verifyCode API here`);
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  const handleEnrollment = async (userId, courseId) => {
    try {
      alert(`Enroll User ${userId} in Course ${courseId} - Connect your enrollment API here`);
    } catch (error) {
      console.error('Error enrolling user:', error);
    }
  };

  const stats = {
    totalCourses: courses.length,
    totalUsers: users.length,
    enrollments: 15234,
    pendingVerifications: 23
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'enrollments', label: 'Enrollments', icon: UserCheck },
    { id: 'verification', label: 'Verify Codes', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Courses</p>
              <p className="text-3xl font-bold">{stats.totalCourses}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Users</p>
              <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Enrollments</p>
              <p className="text-3xl font-bold">{stats.enrollments.toLocaleString()}</p>
            </div>
            <GraduationCap className="w-8 h-8 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Pending Verifications</p>
              <p className="text-3xl font-bold">{stats.pendingVerifications}</p>
            </div>
            <Shield className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Courses</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                <th className="pb-3">Course Title</th>
                <th className="pb-3">Students</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.slice(0, 5).map((course) => (
                <tr key={course.id} className="border-b border-gray-50 last:border-b-0">
                  <td className="py-4 font-medium text-gray-900">{course.title}</td>
                  <td className="py-4 text-gray-600">{course.students}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <button 
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View Course"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        onClick={() => handleUpdateCourse(course.id)}
                        title="Edit Course"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        onClick={() => handleDeleteCourse(course.id)}
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      {activeTab === 'dashboard' && renderDashboard()}
      {/* Add renderCourses, renderUsers, etc. when implementing those tabs */}
    </div>
  );
};

export default AdminDashboard;