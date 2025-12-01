import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchEnrollment } from './coursesSlice';
import { useParams, useNavigate } from 'react-router-dom';
import OnboardingModal from './OnboardingModal';
import Timer from './Timer';

export default function WaitingPage(){
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [enrollment, setEnrollment] = useState(null);
  const [showOnboard, setShowOnboard] = useState(false);

  useEffect(()=>{
    (async ()=>{
      const res = await dispatch(fetchEnrollment({enrollmentId: id}));
      if(res && res.payload) setEnrollment(res.payload);
    })();
  },[dispatch, id]);

  if(!enrollment) return <div>Loading...</div>;

  const startTime = new Date(enrollment.course.start_time);
  const now = new Date();
  const remaining = Math.max(0, Math.floor((startTime - now)/1000));

  return (
    <div className="p-4">
      <h2>{enrollment.course.title}</h2>
      <p>{enrollment.course.description}</p>
      <div className="mt-4">
        <Timer target={enrollment.course.start_time} onZero={()=>setShowOnboard(true)} />
      </div>
      {showOnboard && <OnboardingModal enrollmentId={id} onStart={()=>navigate(`/test/${id}`)} onClose={()=>setShowOnboard(false)} />}
    </div>
  );
}
