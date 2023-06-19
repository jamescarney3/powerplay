import React from 'react';

const REGULATION_PERIODS = 3;

// this implementation uses Bulma tables and might be ugly to work with
const GameCard = ({ currentPeriod, linescore, score, teams }) => {
  const renderOvertimeHeaders = () => {
    return linescore.periods.slice(REGULATION_PERIODS).map((period, idx) => {
      const key = ['ot', (idx + 1).toString()].join('-');
      return (<th key={key}>{period.ordinalNum}</th>);
    });
  };

  const renderPeriodScores = (team: 'home' | 'away') => {
    return linescore.periods.map((period) => {
      const key = 'period-' + period.num.toString();
      return (<td key={key}>{period.goals[team]}</td>)
    });
  };

  const renderRemainingPeriods = () => {
    return new Array(Math.max(REGULATION_PERIODS - currentPeriod, 0))
      .fill(null) // because it has to be filled with *something*
      .map((el, idx) => {
        return (<td key={'period-' + (Math.abs(idx - REGULATION_PERIODS)).toString()} />);
      });
  };


  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>1st</th>
            <th>2nd</th>
            <th>3rd</th>
            {renderOvertimeHeaders()}
            <th>Final</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>{teams.away.name}<span className="tag">Away</span></td>
          {renderPeriodScores('away')}
          {renderRemainingPeriods()}
          <td>{score.away}</td>
        </tr>
        <tr>
          <td>{teams.home.name}<span className="tag">Home</span></td>
          {renderPeriodScores('home')}
          {renderRemainingPeriods()}
          <td>{score.home}</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
};


export default GameCard;
