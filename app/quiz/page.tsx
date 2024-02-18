'use client'
import React, { useState } from 'react';
import { quiz } from '../data';

interface Result {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
}

const Page: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [result, setResult] = useState<Result>({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, options, correctAnswer } = questions[activeQuestion];

  const onAnswerSelected = (question: string, idx: number) => {
    setChecked(true);
    setSelectedAnswerIndex(idx.toString());
    if (question === correctAnswer) {
      setSelectedAnswer(true);
      console.log('true');
    } else {
      setSelectedAnswer(false);
      console.log('false');
    }
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };

  return (
    <div className='container'>
      <h1>Quiz Page</h1>
      <div>
        <h2>
          Question: {activeQuestion + 1}
          <span>/{questions.length}</span>
        </h2>
      </div>
      <div>
        {!showResult ? (
          <div className='quiz-container'>
            <h3>{questions[activeQuestion].question}</h3>
            {options.map((option, idx) => (
              <li
                key={idx}
                onClick={() => onAnswerSelected(option, idx)}
                className={
                  selectedAnswerIndex === idx.toString() ? 'li-selected' : 'li-hover'
                }
              >
                <span>{option}</span>
              </li>
            ))}
            {checked ? (
              <button onClick={nextQuestion} className='btn'>
                {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            ) : (
              <button onClick={nextQuestion} disabled className='btn-disabled'>
                {' '}
                {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            )}
          </div>
        ) : (
          <div className='quiz-container'>
            <h3>Results</h3>
            <h3>Overall {(result.score / 25) * 100}%</h3>
            <p>
              Total Questions: <span>{questions.length}</span>
            </p>
            <p>
              Total Score: <span>{result.score}</span>
            </p>
            <p>
              Correct Answers: <span>{result.correctAnswers}</span>
            </p>
            <p>
              Wrong Answers: <span>{result.wrongAnswers}</span>
            </p>
            <button onClick={() => window.location.reload()}>Restart</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
