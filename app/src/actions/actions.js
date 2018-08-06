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

export function getFrame() {
  return {
    type: 'GET_FRAME',
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
    payload: {
      score,
    }
  }
}

export function fetchingSingleGameScore(bool) {
  return {
    type: 'FETCHING_SINGLE_GAME_SCORE',
    isLoading: bool
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