import React from 'react'
import { Navigate } from 'react-router-dom'

function Admin({ admin }) {
  return (
    <>
      {admin ? 
        <div>
            Admin
        </div>
        : <Navigate to="/" />
      }
    </>
  )
}

export default Admin
