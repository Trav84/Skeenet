import { connect } from 'react-redux';
import { postScore, changeFrame, changePlayer, fetchCurrentSeasonTeams, fetchCurrentTeamPlayers, createGame } from "../actions/actions";
import ScoreForm from '../components/ScoreForm';

const mapStateToProps = state => {
  return {
    activeGame: state.activeGame,
    frame: state.frame,
    players: state.players,
    currentPlayerIndex: state.currentPlayerIndex,
    teams: state.teams.teams,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    postScore: score => dispatch(postScore(score)),
    changeFrame: frame => dispatch(changeFrame(frame)),
    changePlayer: index => dispatch(changePlayer(index)),
    fetchCurrentTeams: () => dispatch(fetchCurrentSeasonTeams()),
    fetchTeamPlayers: (teamId, team) => dispatch(fetchCurrentTeamPlayers(teamId, team)),
    createGame: (teamId, opponentId) => dispatch(createGame(teamId, opponentId)),
  }
};

const ScoreFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScoreForm);

export default ScoreFormContainer;