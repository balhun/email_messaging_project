import React from 'react'
import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login({ auth }) {

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ loginError, setLoginError ] = useState(false);

  const navigate = useNavigate();

  async function login() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      navigate("/", { replace: true });
      setLoginError(false);
    } catch (error) {
      console.log(error.code);
      setLoginError(true);
    }
  }

  return (
    <div className="login">
      <TextField
        error={loginError}
        required
        label="Email"
        value={email}
        onChange={e => { setEmail(e.target.value); setLoginError(false);}}
        helperText=" "
      />
      <TextField 
        error={loginError}
        required
        label="Password"
        type="password"
        value={password}
        onChange={e => { setPassword(e.target.value); setLoginError(false);}}
        helperText={loginError ? "Hibás felhasználónév vagy jelszó" : " "}
      />
      <Button variant="contained" color='success' onClick={login}>Login</Button>
    </div>
  )
}

export default Login
