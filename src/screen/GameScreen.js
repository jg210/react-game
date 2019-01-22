// @flow
//
// (c) 2018-2019 Jeremy Green

import React from 'react';

import Game from '../components/Game';
import Level from '../components/Level';
import Score from '../components/Score';
import WireframeCheckbox from '../components/WireframeCheckbox';

type Props = {};

export default (props: Props) => {
  return (
    <div className="GameScreen">
      <Score />
      <Game />
      <Level />
      <WireframeCheckbox />
    </div>
  );
};