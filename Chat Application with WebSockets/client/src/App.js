import React, { useEffect, useState } from 'react';

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    let ws = new WebSocket('ws://localhost:8080');

    useEffect(() => {
        ws.onmessage = event => {
            setMessages(prevMessages => [...prevMessages, event.data]);
        };
    }, [ws]);

    const sendMessage = () => {
        ws.send(input);
        setInput('');
    };

    return (
        <div>
            <h1>Chat</h1>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default App;
