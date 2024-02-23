'use client'

//app/signup/page
import Link from 'next/link';
import { useState } from 'react';

export default function SignUp() {
  const [signupData, setSignupData] = useState({ username: '', email: '',role: '', password: '' });

  const handleSignup = async () => {
    try {
      const response = await fetch(`/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
    console.log(JSON.stringify(signupData))
      if (response.ok) {
        console.log('User registered successfully');
      } else {
        const errorMessage = await response.text();
        console.error('Error registering user:', errorMessage);
      }
    } catch (error) {
      console.error('Error making the request:', error);
    }
  };
  

  return (
    <main>
    <div className="container">
      <h3>Sign Up</h3>
      <input
        type="text"
        placeholder="User"
        value={signupData.username}
        onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
      />
      <input
        type="text"
        placeholder="Email"
        value={signupData.email}
        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Role (Student or Instructor)"
        value={signupData.role}
        onChange={(e) => setSignupData({ ...signupData, role: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={signupData.password}
        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
      />
      <button onClick={handleSignup}>Registrarse</button>
      <p>
        Already have an account? <a href='/signin'>Inicia Sesión</a>
      </p>
    </div>
  </main>

  );
}