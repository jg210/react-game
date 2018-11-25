// @flow
import { SCORE_UPDATE } from './actionTypes'

export const scoreUpdate = (points: number) => ({
  type: SCORE_UPDATE,
  payload: {
    points: points
  }
});
