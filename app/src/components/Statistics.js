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

  render() {
    let teams = this.props.score.game.teams;
    return (
      <div className="stat-table-wrapper">
        <h1>Statistics Page</h1>
        <h3>Game {this.props.score.game.id} of Season {this.props.score.game.season.id}, {this.props.score.game.season.name} of {this.props.score.game.season.year} </h3>
        {teams.map((item, index) => (
          <div>
            <h3>Team: {item.name}</h3>
            <table>
              <thead>
              <tr>
                <td>Player</td>
                <td>Frame 1</td>
                <td>Frame 2</td>
                <td>Frame 3</td>
                <td>Frame 4</td>
                <td>Frame 5</td>
                <td>Frame 6</td>
                <td>Frame 7</td>
                <td>Frame 8</td>
                <td>Frame 9</td>
                <td>Frame 10</td>
                <td className="table__spacer"></td>
                <td>Final Score</td>
              </tr>
              </thead>
              <tbody>
            {item.players.map(item => {
              return <tr>
                  <td>{item.first_name} "{item.nickname}" {item.last_name}</td>
                  {item.scores.map(item => {
                    return <td
                      className={"button " + (item.points < 18 ? 'jailbait button--enabled' : '')}>{item.points}</td>;
                  })}
                  <td className="table__spacer"></td>
                  <td className={"button " + (item.total_score > 300 ? 'dirty-thirty button--enabled' : '')}>{item.total_score}</td>
                </tr>
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