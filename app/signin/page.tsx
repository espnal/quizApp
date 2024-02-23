'use client'
//app/signin/page
import Link from 'next/link';
import { useState } from 'react';

export default function SignIn() {
  const [loginData, setLoginData] = useState({ username: '',email:'', password: '' });

  const handleLogin = async () => {
    try {

    } catch (error) {
      console.error('Error making the request:', error);
    }
  };

  return (
    <main>
      <div className="container">
<div>
            <h3>Sign In</h3>
            <input
              type="text"
              placeholder="User"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />
                        <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
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
              <span>
                <a href="/signup">Sign Up</a>
                </span>
            </p>
          </div>
          </div>
          </main>
  );
}