import React from 'react';
import PropTypes from 'prop-types';

class ScoreForm extends React.Component {
  static propTypes = {
    postScore: PropTypes.func.isRequired,
    changeFrame: PropTypes.func.isRequired,
    frame: PropTypes.number
  };
  _handleSubmit = (e) => {
    e.preventDefault();

    const formData = {};
    for (const field in this.refs) {
      formData[field] = this.refs[field].value;
    }

    this.props.postScore({
      points: formData.score,
      player_id: 1,
      frame_id: 1,
      team_id: 1,
      game_id: 100
    });

    this.props.changeFrame();
  };
  render() {
    let input;

    return (
      <div>
        <div className="score-form__current-frame">Current Frame:{ this.props.frame }</div>
        <form onSubmit={ this._handleSubmit }>
          <label htmlFor="score">Enter this frames' score.</label>
          <input ref="score" type="number" id="score" name="score"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default ScoreForm;