// @flow

import React from 'react';

import Game from '../components/Game';
import Level from '../components/Level';
import Score from '../components/Score';

type Props = {};

export default (props: Props) => {
  return (
    <div>
      <Score />
      <Game />
      <Level />
    </div>
  );
};