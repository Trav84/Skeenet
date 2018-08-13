import { connect } from 'react-redux';
import SeasonStatistics from '../components/SeasonStatistics';
import { fetchSingleSeasonScores } from "../actions/actions";

const mapStateToProps = state => {
  return {
    season: state.season,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSeasonScores: (id) => dispatch(fetchSingleSeasonScores(id))
  };
};

const SeasonStatisticsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeasonStatistics);

export default SeasonStatisticsContainer;