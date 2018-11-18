const initialActiveGameState = {
  scores: [{}, {}, {}]
};

const initialSeasonState = {
  season: {
    year: '',
    name: '',
    teams: []
  }
};

const initialWeekState = {
  week: {
    id: null,
    season_id: null,
    week_number: null
  }
};

const initialGameState = {
  game: {
    id: null,
    teams: [],
    week: initialWeekState,
    season: initialSeasonState
  }
};

function scores(state = initialGameState, action) {
  switch(action.type) {
    case 'RECEIVED_SINGLE_GAME_SCORE':
      return action.score;
    default:
      return state;
  }
}

function season(state = initialSeasonState, action) {
  switch(action.type) {
    case  'RECEIVED_SINGLE_SEASON_SCORES':
      return action.season;
    default:
      return state;
  }
}

function activeGame(state = initialActiveGameState, action) {
  switch(action.type) {
    case 'POST_SCORE':
      return Object.assign({}, state, {
        scores : state.scores.concat(action.score)
      });
    case 'RECEIVED_NEW_GAME':

    default:
      return state;
  }
}

function frame(frame = 0, action) {
  switch(action.type) {
    case 'CHANGE_FRAME':
      if(action.frame < 10) {
        console.log('Increment frame');
        return ++frame;
      }
      else {
        console.log('Leave frame alone');
        return frame;
      }
    default:
      return frame;
  }
}

function teams(state = { teams: []}, action) {
  switch(action.type) {
    case 'RECEIVED_CURRENT_TEAMS':
      return action.teams;
    default:
      return state;
  }
}

function players(state = [{ nickname: 'Player 1'}, { nickname: 'Player 2'}, { nickname: 'Player 3'}], action) {
  switch(action.type) {
    case 'RECEIVED_CURRENT_TEAM_PLAYERS':
      return action.players;
    default:
      return state;
  }
}

function opponents(state = [{ nickname: 'Player 1'}, { nickname: 'Player 2'}, { nickname: 'Player 3'}], action) {
  switch(action.type) {
    case 'RECEIVED_CURRENT_OPPONENT_PLAYERS':
      return action.opponents;
    default:
      return state;
  }
}

function currentPlayerIndex(currentPlayersIndex = 0, players = [], action) {
  switch(action.type) {
    case 'NEXT_PLAYER':
      if(action.currentPlayersIndex >= players.length - 1) {
        currentPlayersIndex = 0;
      }
      else {
        currentPlayersIndex++;
      }
      return currentPlayersIndex;
    default:
      return currentPlayersIndex;
  }
}

export default function skeeballApp(state = {}, action) {
  return {
    score: scores(state.score, action),
    frame: frame(state.frame, action),
    season: season(state.season, action),
    activeGame: activeGame(state.activeGame, action),
    currentPlayerIndex: currentPlayerIndex(state.currentPlayerIndex, state.players, action),
    players: players(state.players, action),
    teams: teams(state.teams, action),
    opponents: opponents(state.opponents, action),
  }
}
