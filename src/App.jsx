import './App.css'
import { useState, useEffect } from 'react';

import { firebaseConfig } from "../firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import Layout from './Layout.jsx';
import Messages from './pages/Messages.jsx'
import Users from './pages/Users.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default function App() {

  const [ user, setUser ] = useState(null)
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe;
  }, [])

  async function logout() {
    await signOut(auth);
  }

  const router = createBrowserRouter([
    { path: "/", element: <Layout user={user} logout={logout} />, children: [
      { path: "/", element: <Messages user={user} db={db} /> },
      { path: "/users", element: <Users /> },
      { path: "/about", element: <About /> },
      { path: "/login", element: <Login auth={auth} /> },
      { path: "*", element: <NotFound /> }
    ]}
  ])

  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  )
}
