import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { fetchEnrollment, submitExam } from './coursesSlice';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionNumberSidebar from './QuestionNumberSidebar';

const QUESTIONS_PER_PAGE = 10;

export default function TestPage(){
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [answersMap, setAnswersMap] = useState({});
  const [page, setPage] = useState(0);

  useEffect(()=>{
    (async ()=>{
      const res = await dispatch(fetchEnrollment({enrollmentId: id}));
      if(res && res.payload) setEnrollmentData(res.payload);
    })();
  },[dispatch, id]);

  useEffect(()=>{
    // auto-submit on deadline if end_time provided
    let timerId;
    if(enrollmentData && enrollmentData.course && enrollmentData.course.end_time){
      const end = new Date(enrollmentData.course.end_time).getTime();
      const update = ()=> {
        if(Date.now() >= end){
          handleSubmit(true);
        }
      };
      timerId = setInterval(update, 1000);
    }
    return ()=> clearInterval(timerId);
  },[enrollmentData]);

  const questions = enrollmentData?.questions || [];
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  const pageQuestions = useMemo(()=> questions.slice(page*QUESTIONS_PER_PAGE, (page+1)*QUESTIONS_PER_PAGE), [questions, page]);

  const setAnswer = (questionId, choiceId) => {
    setAnswersMap(prev => ({...prev, [questionId]: choiceId}));
  }

  const handleSubmit = async (isAuto=false) => {
    const answers = Object.entries(answersMap).map(([q,ch])=>({question: Number(q), choice: ch}));
    await dispatch(submitExam({ enrollmentId: id, answers }));
    // go to submitted page
    navigate('/test-submitted');
  }

  if(!enrollmentData) return <div>Loading test...</div>;

  return (
    <div className="p-4 flex gap-4">
      <QuestionNumberSidebar questions={questions} answersMap={answersMap} onJump={(idx)=> setPage(Math.floor(idx/QUESTIONS_PER_PAGE))} />
      <div className="flex-1">
        <h3 className="text-lg mb-2">{enrollmentData.course.title}</h3>
        <div className="questions">
          {pageQuestions.map((q, i) => (
            <div key={q.id} className="question p-3 mb-2 border rounded">
              <div><strong>Q{page*QUESTIONS_PER_PAGE + i + 1}.</strong> {q.text}</div>
              <div className="choices mt-2">
                {q.choices.map(c => (
                  <div key={c.id} className="choice">
                    <label>
                      <input type="radio" name={`q-${q.id}`} checked={answersMap[q.id]===c.id} onChange={()=>setAnswer(q.id, c.id)} />
                      <span className="ml-2">{c.text}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <div>
            <button disabled={page===0} onClick={()=>setPage(p=>p-1)} className="btn">Previous</button>
            <button disabled={page>=totalPages-1} onClick={()=>setPage(p=>p+1)} className="btn ml-2">Next</button>
          </div>
          <div>
            <button onClick={()=>handleSubmit(false)} className="btn btn-danger">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
