import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, enrollCourse } from './coursesSlice';
import { Link } from 'react-router-dom';

export default function EnrolledCoursesPage(){
  const dispatch = useDispatch();
  const courses = useSelector(s => s.courses.list || []);
  const [q, setQ] = useState('');
  useEffect(()=>{ dispatch(fetchCourses()); },[dispatch]);

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(fetchCourses(q));
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Enrolled Courses</h2>
        <Link to="/enroll-course" className="btn">Enroll Course</Link>
      </div>
      <form onSubmit={handleSearch} className="mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search courses..." />
        <button type="submit">Search</button>
      </form>
      <div className="grid gap-3">
        {courses.map(c => (
          <div key={c.id} className="card p-3">
            <div className="flex justify-between">
              <div>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <small>Starts: {new Date(c.start_time).toLocaleString()}</small>
              </div>
              <div className="flex flex-col gap-2">
                <Link to={`/courses/${c.id}`} className="btn">View</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
