'use client'
import React,{useState} from 'react';
import {quiz} from '../data';

const page = () => {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [selectedAnswer, setActiveAnswer] = useState('');
    const [checked, setChecked] = useState(false);
    const [selectedAnswerIndex, setActiveAnswerIndex] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState({
        score:0,
        correctAnswer: 0,
        wrongAnswer: 0,
    })
    const {questions} = quiz;
    const {question, options, correctAnswer} = questions[activeQuestion];
    return (
    <div>
        <h1>Quiz page</h1>
        <h2>Question: {activeQuestion+1} <span>/{questions.length}</span></h2>
    <div className="">
        {!showResult ? (<div><h3>{questions[activeQuestion].question}</h3></div>): (<div></div>)}
        {options.map((answer, i) =>(
            <li key={i}>
                <span>{answer}</span>
            </li>
        ))}
    </div>
    </div>
  )
}

export default page
