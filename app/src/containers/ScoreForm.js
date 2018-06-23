import { connect } from 'react-redux';
import { postScore, changeFrame } from "../actions/actions";
import ScoreForm from '../components/ScoreForm';

const mapStateToProps = state => {
  return {
    score: state.score,
    frame: state.frame
  }
};

const mapDispatchToProps = dispatch => {
  return {
    postScore: score => dispatch(postScore(score)),
    changeFrame: frame => dispatch(changeFrame(frame))
  }
};

const ScoreFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScoreForm);

export default ScoreFormContainer;