// @flow

import React from 'react';

import Game from '../components/Game';
import Level from '../components/Level';
import Scores from '../components/Scores';

type Props = {};

export default (props: Props) => {
  return (
    <div>
      <Scores />
      <Game />
      <Level />
    </div>
  );
};