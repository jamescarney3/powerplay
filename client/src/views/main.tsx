import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client'

import { baseApi } from 'configs';


const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(baseApi);

    newSocket.on('connect', () => {
      console.log('server connected');
    });

    newSocket.on('pong', () => {
      console.log('pong');
    });

    setSocket(newSocket);
  }, []);

  const onPing = () => {
    socket.emit('ping');
  };

  return (
    <div>
      <div>node env: {process.env.NODE_ENV}</div>
      <div>base api: {baseApi}</div>
      <button onClick={onPing}>ping</button>
    </div>
  );
};


export default App
