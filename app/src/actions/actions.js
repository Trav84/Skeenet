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

