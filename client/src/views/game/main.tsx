import React from 'react';
import { useParams } from 'react-router-dom';

import { useLiveGameState } from 'hooks/views';


// const CORSI_EVENTS = ['SHOT', 'MISSED_SHOT', 'BLOCKED_SHOT'];

const Game = () => {
  const { gameId } = useParams();

  const { liveFeedData } = useLiveGameState({ gameId });

  // const getCorsiEventsByTeam = () => {
  //   if (!feed.liveData) return null;
  //   return feed.liveData.plays.allPlays
  //     .filter(({ result }) => CORSI_EVENTS.includes(result.eventTypeId))
  //     .reduce((result, play) => {
  //       const teamId = play.team.id;
  //       const teamEvents = result[teamId] || [];
  //       return { ...result, [teamId]: [...teamEvents, play] };
  //     }, {});
  // };
  //
  // const getTeams = () => {
  //   if (!feed.gameData) return null;
  //   return feed.gameData.teams;
  // };

  return (
    <div>
      <div>I am a SPECIFIC game view</div>
      <div>{JSON.stringify({ gameId })}</div>
      <div>{JSON.stringify(liveFeedData)}</div>
    </div>
  )
};


export default Game;
