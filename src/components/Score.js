// @flow
//
// (c) 2018-2020 Jeremy Green

import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { toggleWireframeMode } from '../redux/actions';
import { currentScore } from '../redux/selectors';

export const Score = () => {
  const score = useSelector(currentScore);
  const dispatch = useDispatch();
  const onDoubleClick = () => dispatch(toggleWireframeMode);
  return (
    <div className="Score" onDoubleClick={onDoubleClick}>{score}</div>
  );
}