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
    return (
      <div className="stat-table-wrapper">
        <div className="stat-table__header">
          <h1 className="stat-table__title">Season Overview</h1>
          <h3 className="stat-table__current-season">Season { this.props.season.season.name } of { this.props.season.season.year }</h3>
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
              <td>Week 1</td>
              <td>Week 2</td>
              <td>Week 3</td>
              <td>Week 4</td>
              <td>Week 5</td>
              <td>Week 6</td>
              <td>Week 7</td>
              <td>Week 8</td>
              <td>Week 9</td>
              <td>Week 10</td>
              <td className="table__spacer"></td>
              <td>Season Average</td>
              <td>Season Best</td>
            </tr>
          </thead>
          <tbody>
            {teams.map((item, index) => (
              <tr>
                <td className="table__team-name" data-team-id={ item.id } onClick={() => this._handleTeamClick(item.id)}>{ item.name }</td>
                {item.scores.map((item, index) =>
                  <td className="table__score" data-game-id={ item.game_id } onClick={() => this._handleGameClick(item.game_id)}>{ item.total }</td>
                )}
                <td className="table__spacer"></td>
                <td>{ item.average }</td>
                <td>{ item.best }</td>
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