export function postScore(score) {
  return {
    type: 'POST_SCORE',
    payload: {
      score
    }
  }
}

export function changeFrame() {
  return {
    type: 'CHANGE_FRAME',
  }
}

export function changePlayer(currentIndex) {
  return {
    type: 'NEXT_PLAYER',
    currentIndex
  }
}

export function getScore() {
  return {
    type: 'GET_SCORE'
  }
}

export function receivedSingleGameScore(score) {
  return {
    type: 'RECEIVED_SINGLE_GAME_SCORE',
    score,
  }
}

export function fetchingSingleGameScore(bool) {
  return {
    type: 'FETCHING_SINGLE_GAME_SCORE',
    isLoading: bool
  }
}

export function receivedSingleSeasonScores(season) {
  return {
    type: 'RECEIVED_SINGLE_SEASON_SCORES',
    season
  }
}

// THUNKS //

export function fetchSingleGameScore(id) {
  return (dispatch) => {
    fetch('https://skeenet-api.herokuapp.com/games/' + id)
      .then(response => response.json())
      .then((json) => {
        dispatch(receivedSingleGameScore(json));
      })
  }
}

export function fetchSingleSeasonScores(id) {
  return (dispatch) => {
    fetch('https://skeenet-api.herokuapp.com/seasons/' + id)
      .then(response => response.json())
      .then((json) => {
        dispatch(receivedSingleSeasonScores(json));
      })
  }
}

// score: {
// :player_id   -- *required*
// :frame_id    -- *required*
// :team_id     -- *required*
// :game_id     -- *required*
// :points      -- *required*
// }
export function postingScore(score) {
  return (dispatch) => {
    fetch('https://skeenet-api.herokuapp.com/scores/', {
      method: 'post',
      body: JSON.stringify(score)
    });



    // fetch('https://skeenet-api.herokuapp.com/scores/')
    //   .then(response => response.json())
    //   .then((json) => {
    //     dispatch(receivedSingleGameScore(json))
    //   })
  }
}

export function itemsFetchData(url) {
  return (dispatch) => {
    dispatch(itemsIsLoading(true));
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(itemsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((items) => dispatch(itemsFetchDataSuccess(items)))
      .catch(() => dispatch(itemsHasErrored(true)));
  };
}