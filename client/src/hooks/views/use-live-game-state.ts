import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { baseApi } from 'configs';


const HEARTBEAT_INTERVAL = 1000 * 30;

const useLiveGameState = ({ gameId }) => {
  const [liveFeedData, setLiveFeedData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://${baseApi}/api/game-live/${gameId}`)
      .then((res) => res.json())
      .then((body) => { setLiveFeedData(body) })
      .catch((err) => { setError(err) });

    const socket = io(`${baseApi}/live-feed`);

    socket.on('update-live-feed', (message) => {
      setLiveFeedData(message);
    });

    socket.emit('connect-live-feed', { gameId });

    const heartbeatInterval = setInterval(() => {
      socket.emit('live-feed-heartbeat', { gameId });
    }, HEARTBEAT_INTERVAL);

    return () => {
      socket.disconnect();
      clearInterval(heartbeatInterval);
    };
  }, []);

  return { liveFeedData, error };
};


export default useLiveGameState;
