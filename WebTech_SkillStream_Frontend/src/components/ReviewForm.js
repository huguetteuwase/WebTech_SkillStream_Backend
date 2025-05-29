import React, { useState } from "react";

const ReviewForm = ({ courses, onSubmitReview }) => {
  const [courseId, setCourseId] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (courseId && reviewer && text) {
      onSubmitReview(courseId, { reviewer, text });
      setReviewer("");
      setText("");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Submit Review</h2>
      <div className="mb-3">
        <label className="block mb-1">Course</label>
        <select
          value={courseId}
          onChange={e => setCourseId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select a course --</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="block mb-1">Your Name</label>
        <input
          type="text"
          value={reviewer}
          onChange={e => setReviewer(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="John Doe"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Review</label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Write your review here..."
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default ReviewForm;
