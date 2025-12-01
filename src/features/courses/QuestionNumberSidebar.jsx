import React from 'react';

export default function QuestionNumberSidebar({ questions, answersMap, onJump }){
  return (
    <div className="sidebar">
      <div className="grid gap-2">
        {questions.map((q, idx)=> {
          const answered = !!answersMap[q.id];
          return (
            <button key={q.id} onClick={()=>onJump(idx)} className={`w-10 h-10 rounded ${answered ? 'bg-green-200' : 'bg-gray-200'}`}>
              {idx+1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
