import React/*, { useEffect, useState } */ from 'react';
// import { io } from 'socket.io-client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import { baseApi } from 'configs';
import { MainPageLayout } from 'layouts';
import { Scoreboard } from 'views/scoreboard';
import { Game } from 'views/game';


const App = () => {
  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   const newSocket = io(baseApi);
  //
  //   newSocket.on('connect', () => {
  //     console.log('server connected');
  //   });
  //
  //   newSocket.on('pong', () => {
  //     console.log('pong');
  //   });
  //
  //   setSocket(newSocket);
  // }, []);

  // const onPing = () => {
  //   socket.emit('ping');
  // };

  return (
    <div>
      {/*
      <div>node env: {process.env.NODE_ENV}</div>
      <div>base api: {baseApi}</div>
      <button onClick={onPing}>ping</button>
      */}
      <BrowserRouter>
        <MainPageLayout>
          <MainPageLayout.Menu>
            <nav className="menu">
              <h1 className="menu-label">Powerplay</h1>
              <ul class="menu-list">
                <li>
                  scoreboard
                </li>
              </ul>
            </nav>
          </MainPageLayout.Menu>
          <MainPageLayout.Content>
            <Routes>
              <Route path="/" element={<div>home</div>}></Route>
              <Route path="/scoreboard" element={
                <Scoreboard />
              } />
              <Route path="/game/:gameId" element={
                <Game />
              } />
            </Routes>
          </MainPageLayout.Content>
        </MainPageLayout>
      </BrowserRouter>
    </div>
  );
};


export default App
