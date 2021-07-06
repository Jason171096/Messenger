import { useEffect, useState } from 'react';
import './App.css';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
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

    setMessages([...messages, { username: username, text: input }])
    setInput('')
  }

  useEffect(() => {
    db.collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()))
    })
  }, [])

  useEffect(() => {
    setUsername(prompt('Please enter your name'))
  }, [])

  return (
    <div className="App">
      <h1>Hello Programmers!!</h1>
      <h2>Welcome {username}</h2>
      <FormControl>
        <InputLabel>Enter a message.. </InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)} />
        <Button disabled={!input} variant='contained' color='primary' type='submit' onClick={sendMessage}>Send Message</Button>
      </FormControl>
      <FlipMove>
        {
          messages.map(message => (
            <Message usernameLogin={username} username={message.username} text={message.text} />
          ))
        }
      </FlipMove>
    </div>
  );
}

export default App;
