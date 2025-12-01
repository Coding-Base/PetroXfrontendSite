import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, enrollCourse } from './coursesSlice';
import { useNavigate } from 'react-router-dom';

export default function EnrollCoursePage(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector(s => s.courses.list || []);
  const [q, setQ] = useState('');
  useEffect(()=>{ dispatch(fetchCourses()); },[dispatch]);

  const doEnroll = async (courseId) => {
    const res = await dispatch(enrollCourse({courseId}));
    if(res && res.payload && res.payload.id){
      // redirect to waiting page (we assume enrollment id returned)
      navigate(`/enrollment/${res.payload.id}`);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchCourses(q));
  }

  return (
    <div className="p-4">
      <h2 className="text-xl mb-3">Enroll Course</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search courses (e.g PET 501 Test)" />
        <button type="submit">Search</button>
      </form>
      <div className="grid gap-3">
        {courses.map(c => (
          <div key={c.id} className="card p-3 flex justify-between items-center">
            <div>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
            <div>
              <button onClick={()=>doEnroll(c.id)} className="btn">Enroll</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
