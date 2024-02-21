'use client'
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [signupData, setSignupData] = useState({ username: '', password: '', role: '' });
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSignup = async () => {
    try {

    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const handleLogin = async () => {
    try {

    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <main>
      <div className="container">
        <h1>Quiz App</h1>
        {isRegistering ? (
          <div>
            <h3>Registro</h3>
            <input
              type="text"
              placeholder="User"
              value={signupData.username}
              onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            />
            <input
              type="text"
              placeholder="Role (Student or Instructor)"
              value={signupData.role}
              onChange={(e) => setSignupData({ ...signupData, role: e.target.value })}
            />
            <button onClick={handleSignup}>Registrarse</button>
            <p>
              Already have an have an account?{' '}
              <span onClick={() => setIsRegistering(false)}>Inicia Sesión</span>
            </p>
          </div>
        ) : (
          <div>
            <h3>Sign In</h3>
            <input
              type="text"
              placeholder="User"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button onClick={handleLogin}>Sign In</button>
            <p>
              Don't have an account yet?{' '}
              <span onClick={() => setIsRegistering(true)}>
                <a>Sign Up</a>
                </span>
            </p>
          </div>
        )}
        <Link href="/quiz">
          <button>Start Quiz</button>
        </Link>
      </div>
    </main>
  );
}