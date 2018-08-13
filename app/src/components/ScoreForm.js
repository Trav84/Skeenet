import React from 'react';
import PropTypes from 'prop-types';

class ScoreForm extends React.Component {
  static propTypes = {
    postScore: PropTypes.func.isRequired,
    changeFrame: PropTypes.func.isRequired,
    changePlayer: PropTypes.func.isRequired,
    frame: PropTypes.number
  };
  _handleSubmit = (e) => {
    e.preventDefault();

    // const formData = {};
    // for (const field in this.refs) {
    //   formData[field] = this.refs[field].value;
    // }
    //
    // this.props.postScore({
    //   points: formData.score,
    //   player_id: 1,
    //   frame_id: 1,
    //   team_id: 1,
    //   game_id: 100
    // });
    if(this.props.frame >= 10) {
      console.info('No more frames');
      return;
    }

    this.props.changePlayer();
    this.props.changeFrame();
  };
  render() {
    let input;

    return (
      <div className="score-form__component">
        <div className="score-form__current-player">Current Player: { this.props.currentPlayer } </div>
        <div className="score-form__current-frame">Frame: { this.props.frame }</div>
        <form onSubmit={ this._handleSubmit }>
          <label htmlFor="score" className="score-form__score-label">Enter this frames' score.</label>
          <input ref="score" type="number" id="score" name="score" className="score-form__input"></input>
          <button type="submit" className="score-form__submit-button">Submit</button>
        </form>
      </div>
    )
  }
}

export default ScoreForm;