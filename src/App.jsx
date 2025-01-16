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
import Admin from './pages/Admin.jsx';


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default function App() {

  const [ user, setUser ] = useState(null);
  const [ admin, setAdmin ] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email == "bela@gmail.com") setAdmin(true);
      else setAdmin(false);
    });
    return () => unsubscribe;
  }, [])

  async function logout() {
    await signOut(auth);
  }

  const router = createBrowserRouter([
    { path: "/", element: <Layout user={user} logout={logout} admin={admin} />, children: [
      { path: "/", element: <Messages user={user} db={db} /> },
      { path: "/users", element: <Users db={db} /> },
      { path: "/about", element: <About /> },
      { path: "/admin", element: <Admin admin={admin} /> },
      { path: "/login", element: <Login auth={auth} /> },
      { path: "*", element: <NotFound /> }
    ]}
  ]);

  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  )
}
