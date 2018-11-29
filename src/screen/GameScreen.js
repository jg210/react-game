// @flow

import React from 'react';

import Game from '../Game';
import Level from '../Level';
import Scores from '../Scores';

type Props = {};

export default (props: Props) => {
  return (
    <div>
      <Scores />
      <Game />
      <Level numberOfLevels={10} />
    </div>
  );
};