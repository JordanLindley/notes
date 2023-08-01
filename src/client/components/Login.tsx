import { useState } from 'react';

export default function Login(props: {
  onSubmit: (email: string, pass: string) => void;
}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div className="signup-box">
      <label htmlFor="email">Email Address</label>
      <input
        name="email"
        type="text"
        placeholder="user@email.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <label htmlFor="password">Password</label>
      <input
        name="password"
        type="text"
        placeholder="*******"
        value={pass}
        onChange={(e) => {
          setPass(e.target.value);
        }}
      ></input>
      <button type="submit" onClick={() => props.onSubmit(email, pass)}>
        Log In
      </button>
    </div>
  );
}
