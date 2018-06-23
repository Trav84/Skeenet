//
// const initialState = {
//   frame: 0,
//   score: []
// };
//
// // Setup initial state.
// function app(state = initialState, action) {
//   switch(action) {
//     case 'POST_SCORE':
//       return  Object.assign({}, state, {
//         score: scores(state.score, action.score)
//       });
//     case 'GET_SCORE':
//       return Object.assign({}, state, {
//         score: state.score[action.frame]
//       });
//     default:
//       return state;
//   }
// }

function scores(state = [], action) {
  switch(action.type) {
    case 'POST_SCORE':
      let newState = state;
      newState.push(action.payload.score);
      return newState;
    case 'GET_SCORE':
      return state.score[action.frame];
    default:
      return state;
  }
}

function frames(state = 0, action) {
  switch(action.type) {
    case 'CHANGE_FRAME':
      let newFrame = state;
      newFrame++;
      return newFrame;
    case 'GET_FRAME':
      return state;
    default:
      return state;
  }
}

export default function skeeballApp(state = {}, action) {
  return {
    score: scores(state.score, action),
    frames: frames(state.frame, action)
  }
}