import { useEffect, useState } from "react";

export default function CourseSearchPage() {
  // Mock data for demonstration
  const [courses, setCourses] = useState([
    { id: 1, title: "React Fundamentals", instructor: "John Doe", length: "40", category: "Web Development" },
    { id: 2, title: "Advanced JavaScript", instructor: "Jane Smith", length: "35", category: "Web Development" },
    { id: 3, title: "UI/UX Design Basics", instructor: "Mike Johnson", length: "25", category: "Design" },
    { id: 4, title: "Digital Marketing", instructor: "Sarah Wilson", length: "30", category: "Marketing" },
    { id: 5, title: "Python for Beginners", instructor: "Alex Brown", length: "45", category: "Programming" },
    { id: 6, title: "Graphic Design Mastery", instructor: "Emma Davis", length: "50", category: "Design" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
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
  }, [courses, searchTerm, selectedCategory]);

  const handleSearch = () => {
    console.log("Searching for:", searchTerm, "in category:", selectedCategory);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedCategory("All Courses");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <i className="fas fa-phone-alt mr-2"></i>+250783836604
            </span>
            <span>|</span>
            <span className="flex items-center">
              <i className="fas fa-envelope mr-2"></i>skillstream@gmail.com
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <i className="fas fa-book-reader text-blue-600 text-2xl mr-3"></i>
            <h1 className="text-2xl font-bold text-blue-600 uppercase">SkillStream</h1>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
            <a href="#" className="text-blue-600 font-semibold">Courses</a>
          </div>
        </div>
      </nav>

      {/* Search Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Course</h1>
          <p className="text-xl mb-8 text-blue-100">Search through our extensive collection of courses</p>
          
          {/* Search Form */}
          <div className="bg-white rounded-lg p-2 shadow-lg">
            <div className="flex flex-col md:flex-row gap-2">
              {/* Category Dropdown */}
              <div className="relative">
                <button
                  className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg flex items-center justify-between min-w-[180px] hover:bg-gray-200 transition-colors"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span>{selectedCategory}</span>
                  <i className={`fas fa-chevron-down ml-2 transition-transform ${showDropdown ? 'rotate-180' : ''}`}></i>
                </button>
                {showDropdown && (
                  <div className="absolute top-12 left-0 bg-white rounded-lg shadow-lg border z-10 min-w-[180px]">
                    {["All Courses", "Web Development", "Design", "Marketing", "Programming"].map((category) => (
                      <button
                        key={category}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 first:rounded-t-lg last:rounded-b-lg"
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Input */}
              <input
                type="text"
                className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search courses, instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />

              {/* Search Button */}
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors"
                onClick={handleSearch}
              >
                <i className="fas fa-search mr-2"></i>Search
              </button>
            </div>
          </div>
          
          {/* Search Results Count */}
          <p className="mt-4 text-blue-100">
            {filteredCourses?.length || 0} courses found
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredCourses?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <i className="fas fa-book-open text-white text-4xl"></i>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <i className="fas fa-user mr-2"></i>
                      {course.instructor}
                    </span>
                    <span className="flex items-center text-yellow-500">
                      <i className="fas fa-clock mr-2"></i>
                      {course.length} hrs
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      {course.category}
                    </span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                      View Course
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <i className="fas fa-search text-gray-400 text-6xl mb-4"></i>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No courses found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm 
                ? `No courses match your search for "${searchTerm}"` 
                : "No courses available at the moment"
              }
            </p>
            {(searchTerm || selectedCategory !== "All Courses") && (
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                onClick={clearSearch}
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}