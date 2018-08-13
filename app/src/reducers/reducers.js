const initialGameState = {
  game: {
    teams: [],
    season: {}
  }
};

const initialActiveGameState = {
  currentPlayer: 'Default',
  scores: []
};

const initialSeasonState = {
  season: {
    year: '',
    name: '',
    teams: []
  }
};

const initialCurrentPlayerState = {
  players: ['Player 1', 'Player 2', 'Player 3'],
  currentIndex: 0
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
    case  'ADD_SCORE':
      return Object.assign({}, state, {
        scores : state.scores.concat(action.score)
      });
    default:
      return state;
  }
}

function frame(state = 0, action) {
  switch(action.type) {
    case 'CHANGE_FRAME':
      return state + 1;
    default:
      return state;
  }
}

function currentPlayer(state = initialCurrentPlayerState, action) {
  switch(action.type) {
    case 'NEXT_PLAYER':
      let index = action.currentIndex;
      if(action.currentIndex > state.length) {
        index = 0;
      }
      else {
        index++;
      }
      return state.players[index];
    default:
      return 'Player 1';
  }
}

export default function skeeballApp(state = {}, action) {
  return {
    score: scores(state.score, action),
    frame: frame(state.frame, action),
    season: season(state.season, action),
    activeGame: activeGame(state.activeGame, action),
    currentPlayer: currentPlayer(state.currentPlayer, action)
  }
}