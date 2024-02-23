'use client'

//app/page
import Link from 'next/link';
import { FaUserAlt } from "react-icons/fa";

export default function Home() {


  return (
    <main>
      <div className="container">
        <h1>Quiz App</h1>
        <div className="">
        <a href='/signin'>
        <FaUserAlt className='usericon'/>
        </a>
        </div>
        <Link href="/quiz">
          <button>Start Quiz</button>
        </Link>
      </div>
    </main>
  );
}