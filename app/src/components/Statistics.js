import React from 'react';
import PropTypes from "prop-types";

class Statistics extends React.Component {
  static propTypes = {
    fetchGameScore: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchGameScore(1);
    console.info(this.props.score);
  }

  render() {
    let teams = this.props.score.game.teams;
    return (
      <div className="stat-table-wrapper">
        <h1>Statistics Page</h1>
        <h3>Game {this.props.score.game.id} of Season {this.props.score.game.id}, {this.props.score.game.season.name} of {this.props.score.game.season.year} </h3>
        {teams.map((item, index) => (
          <div>
            <h3>Team: {item.name}</h3>
            {item.players.map(item => {
              return <table>
                <thead>
                <tr>
                  <td>Player</td>
                  {item.scores.map((item, index) =>
                    <td>{item.frame_id}</td>
                  )}
                  <td>Final Score</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>{item.first_name} "{item.nickname}" {item.last_name}</td>
                  {item.scores.map(item => {
                    return <td
                      className={"button " + (item.points < 18 ? 'jailbait button--enabled' : '')}>{item.points}</td>;
                  })}
                  <td className={"button " + (item.total_score > 300 ? 'dirty-thirty button--enabled' : '')}>{item.total_score}</td>
                </tr>
                </tbody>
              </table>
            })}
          </div>
          )
        )}
      </div>
    )
  }
}

export default Statistics;