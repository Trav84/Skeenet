import { connect } from 'react-redux';
import { postScore, changeFrame, changePlayer } from "../actions/actions";
import ScoreForm from '../components/ScoreForm';

const mapStateToProps = state => {
  return {
    activeGame: state.activeGame,
    frame: state.frame,
    currentPlayer: state.currentPlayer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    postScore: score => dispatch(postScore(score)),
    changeFrame: frame => dispatch(changeFrame(frame)),
    changePlayer: index => dispatch(changePlayer(index))
  }
};

const ScoreFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScoreForm);

export default ScoreFormContainer;