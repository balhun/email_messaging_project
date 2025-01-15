import React from 'react'
import { useState, useEffect } from 'react';
import { addDoc, collection, onSnapshot, or, query, Timestamp, where } from 'firebase/firestore';
import { Button, TextField } from '@mui/material';

function Messages({ user, db }) {

  const [ messages, setMessages ] = useState([]);
  const [ message, setMessage ] = useState("");
  const [ email, setEmail ] = useState("");

  async function sendMessage() {
    await addDoc(collection(db, "message"), { ki:user.email, kinek:kinek, uzenet:uzene, mikor:Timestamp.now().toDate() })
  }

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(query(collection(db, 'messages'), or(where("ki", "==", user.email), where("kinek", "==", user.email))), (snap) => {
        setMessages(snap.docs.map(doc => ({ ...doc.data(), id:doc.id })));
      });
      return unsub;
    } else {
      setMessages([]);
    }
  },[user]);

  return (
    <>
      {messages.length > 0 ? <div className='sendmessage'>
        <TextField
          required
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          required
          label="Üzenet"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <Button variant="contained" color='success' onClick={sendMessage}>Send</Button>
      </div> : "" }
      <div className='messages'>
        {messages.map(x => <p key={x.id}>{x.ki} - {x.kinek} : {x.uzenet} ({x.mikor.toDate().toDateString()})</p>)}
      </div>
    </>
  )
}

export default Messages
