import React from 'react';
import PropTypes from "prop-types";

class Statistics extends React.Component {
  static propTypes = {
    fetchGameScore: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // TODO: Figure out a cleaner way to do this.
    let matches = this.props.location.search.match(/game=([^&]*)/);
    this.props.fetchGameScore(matches[1]);
  }

  playerAwards(player) {
    let pClass = []
    if (this.isDirtyThirty(player)) {
      pClass.push('dirty-thirty button--enabled')
    }
    return pClass.join(" ")
  }

  frameAwards(score) {
    let pClass = []
    if (this.isJailbait(score)) {
      pClass.push('jailbait button--enabled')
    }
    return pClass.join(" ")
  }

  isDirtyThirty(player) {
    return player.total_score > 300
  }

  isJailbait(score) {
    return score.points < 18
  }

  render() {
    let game = this.props.score.game
    let teams = game.teams;
    let week = game.week;
    let season = game.season;
    const frameRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
      <div className="stat-table-wrapper">
        <h1>Statistics Page</h1>
        <h3>Game {week.week_number} of Season {season.id}, {season.name} of {season.year} </h3>
        {teams.map((team, i) => (
          <div key={i}>
            <h3>Team: {team.name}</h3>
            <table>
              <thead>
              <tr>
                <td>Player</td>
                {frameRange.map((frame, i) => (
                  <td key={i}>Frame {frame}</td>
                ))}
                <td className="table__spacer"></td>
                <td>Final Score</td>
              </tr>
              </thead>
              <tbody>

                {team.players.map((player, j) => {
                  return (<tr key={j}>
                    <td>{player.first_name} "{player.nickname}" {player.last_name}</td>

                    {player.scores.map((score, k) => {
                      return (<td key={k} className={"button " + this.frameAwards(score)}>{score.points}</td>);
                    })}

                    <td className="table__spacer"></td>
                    <td className={"button " + this.playerAwards(player)}>{player.total_score}</td>
                  </tr>)
                })}

              </tbody>
            </table>
          </div>
          )
        )}
      </div>
    )
  }
}

export default Statistics;
