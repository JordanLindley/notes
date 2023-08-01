import { useState } from 'react';
import Signup from './Signup';
import Login from './Login';

export default function LoginSignup() {
  const [mode, setMode] = useState('login');

  function onSubmitSignup(email: string, pass: string) {
    fetch(`api/users/signup`, {
      method: 'POST',
      body: JSON.stringify({ email, pass }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (res) => res.json())
      .then((user) => {
        console.log(user);
      });
  }

  function onSubmitLogin(email: string, pass: string) {
    fetch(`api/users/login`, {
      method: 'POST',
      body: JSON.stringify({ email, pass }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (res) => res.json())
      .then((user) => {
        console.log(user);
      });
  }

  return (
    <div>
      {mode === 'login' ? (
        <Login onSubmit={onSubmitLogin}></Login>
      ) : (
        <Signup onSubmit={onSubmitSignup}></Signup>
      )}
      <button
        onClick={() => {
          setMode(mode === 'login' ? 'signup' : 'login');
        }}
      >
        {mode === 'login'
          ? 'Not yet registered? Sign up!'
          : 'Already have an account? Log in!'}
      </button>
    </div>
  );
}
