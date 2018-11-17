export function postScore(score) {
  return {
    type: 'POST_SCORE',
    score
  }
}

export function changeFrame(frame) {
  return {
    type: 'CHANGE_FRAME',
    frame
  }
}

export function changePlayer(currentPlayersIndex) {
  return {
    type: 'NEXT_PLAYER',
    currentPlayersIndex
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

export function receivedCurrentSeasonTeams(teams) {
  return {
    type: 'RECEIVED_CURRENT_TEAMS',
    teams
  }
}

export function receivedCurrentTeamPlayers(players) {
  return {
    type: 'RECEIVED_CURRENT_TEAM_PLAYERS',
    players
  }
}

export function receivedCurrentOpponentPlayers(opponents) {
  return {
    type: 'RECEIVED_CURRENT_OPPONENT_PLAYERS',
    opponents
  }
}

export function receivedNewGame(newGame) {
  return {
    type: 'RECEIVED_NEW_GAME',
    newGame
  }
}

// THUNKS //
export function createGame(teamId, opponentId) {
  return (dispatch) => {
    fetch('https://skeenet-api.herokuapp.com/games/?team_ids=' + teamId + ',' + opponentId)
      .then(response => response.json())
      .then((json) => {
        dispatch(receivedNewGame(json));
      })
  }
}

export function fetchCurrentSeasonTeams() {
  return (dispatch) => {
    fetch('https://skeenet-api.herokuapp.com/teams/')
      .then(response => response.json())
      .then((json) => {
        dispatch(receivedCurrentSeasonTeams(json));
      })
  }
}

export function fetchCurrentTeamPlayers(teamId, team) {
  return (dispatch) => {
    fetch('https://skeenet-api.herokuapp.com/players/')
      .then(response => response.json())
      .then((json) => {
        let currentPlayers = [];
        json.players.forEach(function(player) {
          player.teams.forEach(function(teams) {
            if(teams.id === parseInt(teamId)) {
              currentPlayers.push(player);
            }
          });
        });

        if(team === 'self') {
          dispatch(receivedCurrentTeamPlayers(currentPlayers));
        }
        else {
          dispatch(receivedCurrentOpponentPlayers(currentPlayers));
        }
      })
  }
}

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