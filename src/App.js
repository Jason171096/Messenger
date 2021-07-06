import { useEffect, useState } from 'react';
import './App.css';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import Message from './Message';
import db from './Firebase'
import firebase from 'firebase';
import FlipMove from 'react-flip-move'

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    // {username: "pancho", message:"Hey perras"},
    // {username: "gus", message:"Que pasa!"},
    // {username: "jason", message:"Putas"},
  ])
  const [username, setUsername] = useState('')

  //useState = variable in REACT
  //useEffect = run code on a condition in REACT

  const sendMessage = (event) => {
    //Logic Message
    event.preventDefault()

    db.collection('messages').add({
      text: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    // setMessages([...messages, { username: username, text: input }])
    setInput('')
  }

  useEffect(() => {
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
    })
  }, [])

  useEffect(() => {
    setUsername(prompt('Please enter your name'))
  }, [])

  return (
    <div className="App">
      <img src="https://logospng.org/download/telegram/logo-telegram-4096.png" width="100px" height="100px"/>
      <h1>Hello Programmers!!</h1>
      <h2>Welcome {username}</h2>
      <form className="Form">
        <FormControl className="FormControl">
          <Input className="FormInput" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)} />
          <IconButton className="FormButton" disabled={!input} variant='contained' color='primary' type='submit' onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {
          messages.map(message => (
            <Message key={message.id} usernameLogin={username} username={message.data.username} text={message.data.text} />
          ))
        }
      </FlipMove>
    </div>
  );
}

export default App;
