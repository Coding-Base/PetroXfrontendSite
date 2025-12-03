import { useState, useEffect, useCallback } from 'react';

export const useTestTimer = (endTime) => {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    if (!endTime) return;

    const updateTimer = () => {
      const now = new Date();
      const end = new Date(endTime);
      const diff = Math.max(0, Math.floor((end - now) / 1000));

      if (diff === 0) {
        setIsTimeUp(true);
        setTimeRemaining(null);
      } else {
        setIsTimeUp(false);
        setTimeRemaining(diff);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const formatTime = (seconds) => {
    if (!seconds) return '00:00:00';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return {
    timeRemaining,
    isTimeUp,
    formattedTime: formatTime(timeRemaining),
  };
};

export const useTestAnswers = (questions = []) => {
  const [answers, setAnswers] = useState({});

  const setAnswer = useCallback((questionId, choiceId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: choiceId,
    }));
  }, []);

  const isAnswered = useCallback((questionId) => {
    return answers[questionId] !== undefined && answers[questionId] !== null;
  }, [answers]);

  const getAnswer = useCallback((questionId) => {
    return answers[questionId];
  }, [answers]);

  const answeredCount = useCallback(() => {
    return Object.values(answers).filter(v => v !== undefined && v !== null).length;
  }, [answers]);

  const getAnswersForSubmit = useCallback(() => {
    return Object.entries(answers).map(([questionId, choiceId]) => ({
      question: parseInt(questionId),
      choice: choiceId,
    }));
  }, [answers]);

  const resetAnswers = useCallback(() => {
    setAnswers({});
  }, []);

  return {
    answers,
    setAnswer,
    isAnswered,
    getAnswer,
    answeredCount,
    getAnswersForSubmit,
    resetAnswers,
  };
};
