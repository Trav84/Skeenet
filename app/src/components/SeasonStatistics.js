import React from 'react';
import PropTypes from "prop-types";

class SeasonStatistics extends React.Component {
  static propTypes = {
    fetchSeasonScores: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchSeasonScores(1);
  }

  _handleGameClick = (id) => {
    console.log(id);
    this.props.history.push('/statistics?game=' + id);
  };

  _handleTeamClick = (id) => {
    console.log(id);
  };

  render() {
    let teams = this.props.season.season.teams;
    let season = this.props.season.season;
    const weeks = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
      <div className="stat-table-wrapper">
        <div className="stat-table__header">
          <h1 className="stat-table__title">Season Overview</h1>
          <h3 className="stat-table__current-season">Season { season.name } of { season.year }</h3>
          <label className="stat-table__select-label" htmlFor="year">Previous Seasons</label>
          <select className="stat-table__select-year" name="year">
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <td>Team</td>
              {weeks.map((week, i) => (
                <td key={i}>Week {week}</td>
              ))}
              <td className="table__spacer"></td>
              <td>Season Average</td>
              <td>Season Best</td>
            </tr>
          </thead>
          <tbody>

            {teams.map((team, i) => (
              <tr key={i}>
                <td className="table__team-name" data-team-id={ team.id } onClick={() => this._handleTeamClick(team.id)}>{ team.name }</td>

                {team.scores.map((score, j) =>
                  <td key={j} className="table__score" data-game-id={ score.game_id } onClick={() => this._handleGameClick(score.game_id)}>{ score.total }</td>
                )}

                <td className="table__spacer"></td>
                <td>{ team.average }</td>
                <td>{ team.best }</td>
              </tr>
              )
            )}

          </tbody>
        </table>
      </div>
    )
  }
}

export default SeasonStatistics;
