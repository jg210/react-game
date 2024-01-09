// @flow
//
// (c) 2018-2019 Jeremy Green

import React from 'react';

import Game from '../components/Game';
import Score from '../components/Score';

type Props = {};

export const GameScreen = (props: Props) => {
  return (
    <div className="GameScreen">
      <Score />
      <Game />
    </div>
  );
};