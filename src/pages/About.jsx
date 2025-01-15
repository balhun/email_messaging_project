import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div>
      <p><b>Messages v1.0.0</b></p>
      <p>
        Üzenetküldő alkalmazás React Vite keretrendszer használatával.
      </p>
      <ul>
        <li><Link to="/" >Messages</Link>: itt láthatóak az üzenetek</li>
        <li><Link to="/users" >Users</Link>: felhasználók listája</li>
        <li><Link to="/about" >About</Link>: alkalmazás leírása</li>
        <li><Link to="/login" >Login</Link>: bejelentkezés az alkalmazásba</li>
      </ul>
    </div>
  )
}
