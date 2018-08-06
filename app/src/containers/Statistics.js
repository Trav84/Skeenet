import { connect } from 'react-redux';
import Statistics from '../components/Statistics';
import { fetchSingleGameScore } from "../actions/actions";

const mapStateToProps = state => {
  return {
    score: state.score,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGameScore: (id) => dispatch(fetchSingleGameScore(id))
  };
};

const StatisticsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Statistics);

export default StatisticsContainer;