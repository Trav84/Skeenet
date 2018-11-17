import React from 'react';
import PropTypes from 'prop-types';

class ScoreForm extends React.Component {
  static propTypes = {
    postScore: PropTypes.func.isRequired,
    changeFrame: PropTypes.func.isRequired,
    changePlayer: PropTypes.func.isRequired,
    fetchCurrentTeams: PropTypes.func.isRequired,
    fetchTeamPlayers: PropTypes.func.isRequired,
    frame: PropTypes.number,
    currentPlayerIndex: PropTypes.number,
    teams: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      currentTeamId: null,
      opponentTeamId: null
    };
  }

  componentDidMount() {
    this.props.fetchCurrentTeams();
  }

  _buildTeamSelect = (team) => {
    let items = [];
    let teams = this.props.teams;
    let label = <option key="disabled" selected disabled>Select your team</option>;

    if(team !== 'self') {
      label = <option key="disabled" selected disabled>Select your opponent</option>
    }

    if(teams.length > 0) {
      items.push(label);
      teams.forEach(function(team) {
        items.push(<option key={team.id} value={team.id}>{team.name}</option>);
      });
    }

    return items;
  };

  _handleTeamSelect = (e) => {
    let teamId = e.target.value;
    this.setState({ currentTeamId: teamId });
    this.props.fetchTeamPlayers(teamId, 'self');
    this._fetchGame();
  };

  _handleOpponentTeamSelect = (e) => {
    let teamId = e.target.value;
    this.setState({ opponentTeamId: teamId });
    this.props.fetchTeamPlayers(teamId, 'opponent');
    this._fetchGame();
  };

  _fetchGame = () => {
    console.log('creating game...');
    console.log(this.state);
    if(this.state.currentTeamId !== null && this.state.opponentTeamId !== null) {
      this.props.createGame(this.state.currentTeamId, this.state.opponentTeamId);
    }
  };

  _handleSubmit = (e) => {
    e.preventDefault();

    const formData = {};
    for (const field in this.refs) {
      formData[field] = this.refs[field].value;
    }

    if(formData.score.length === 0) {
      return;
    }

    this.props.postScore(formData.score);

    // this.props.postScore({
    //   points: formData.score,
    //   player_id: this.props.players[this.props.currentPlayerIndex].id,
    //   frame_id: this.props.frame + 1,
    //   team_id: this.state.currentTeamId,
    //   game_id: 100
    // });

    if(this.props.frame >= 10) {
      console.info('No more frames');
      return;
    }

    this.props.changePlayer(this.props.currentPlayerIndex);

    if(this.props.currentPlayerIndex === 2) {
      this.props.changeFrame(this.props.frame);
    }
  };
  render() {
    let input;

    return (
      <div className="score-form__component">
        <div>
          <label htmlFor="team-select">Choose your team:</label>

          <select id="team-select" onChange={this._handleTeamSelect}>
            {this._buildTeamSelect('self')}
          </select>

          <select id="opponent-team-select" onChange={this._handleOpponentTeamSelect}>
            {this._buildTeamSelect()}
          </select>

        </div>
        <div className="score-form__current-player">Current Player: { this.props.players[this.props.currentPlayerIndex].nickname } </div>
        <div className="score-form__current-frame">Frame: { this.props.frame + 1}</div>
        <form onSubmit={ this._handleSubmit }>
          <label htmlFor="score" className="score-form__score-label">Enter this frames' score.</label>
          <input ref="score" type="number" id="score" name="score" className="score-form__input"/>
          <button type="submit" className="score-form__submit-button">Submit</button>

          <div className="score-form__checkbox-container">
            <label className="score-form__checkbox-container-loop">
              Loop 360
              <input type="checkbox" name="loop" value="loop" />
            </label>
            <label>
              The Shocker
              <input type="checkbox" name="shocker" value="shocker" />
            </label>
            <label>
              The Cougar
              <input type="checkbox" name="cougar" value="cougar" />
            </label>
            <label>
              Benji
              <input type="checkbox" name="benji" value="benji" />
            </label>
          </div>
        </form>
      </div>
    )
  }
}

export default ScoreForm;