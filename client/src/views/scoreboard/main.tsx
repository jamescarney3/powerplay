import React, { useEffect, useState } from 'react';

import { baseApi } from 'configs';
import { GameCard } from 'components';

const Scoreboard = () => {
  const [scheduleData, setScheduleData] = useState({
    games: [],
  });

  useEffect(() => {
    fetch(`http://${baseApi}/api/schedule`)
      .then((res) => res.json())
      .then((body) => setScheduleData(body))
      .catch((err) => console.log(err));
  }, []);

  const renderGameCards = (games = []) => {
    console.log(games);
    return games.map((game) => (
      <GameCard {...game} key={game.nhlId} />
    ));
  };

  return (
    <div className="container">
      <h2 className="title block">Scoreboard</h2>
      <div className="block">
        {renderGameCards(scheduleData.games)}
      </div>
    </div>
  );
};


export default Scoreboard;
