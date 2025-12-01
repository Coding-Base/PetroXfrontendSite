import React from 'react';
import axios from 'axios';

export default function OnboardingModal({ enrollmentId, onStart, onClose }){
  const start = async () => {
    try{
      await axios.post(`/api/exams/enrollment/${enrollmentId}/start/`);
    }catch(e){
      // ignore
    }
    onStart();
  }

  return (
    <div className="modal">
      <div className="modal-content p-4">
        <h3>Instructions</h3>
        <ol>
          <li>Examination malpractice is a punishable offense.</li>
          <li>Do not move your head or behave oddly while taking the test.</li>
          <li>Do not minimize your screen or leave the tab.</li>
          <li>Finish before the system automatically submits for you.</li>
        </ol>
        <div className="flex gap-2 mt-3">
          <button onClick={start} className="btn">Start Test</button>
          <button onClick={onClose} className="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
}
