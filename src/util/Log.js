// @flow
//
// (c) 2018-2019 Jeremy Green

import _ from 'lodash';

type Message = string | () => string;

type Level = 'INFO' | 'DEBUG';

const levels: Level[] = ['INFO', 'DEBUG'];

const levelStringLengths: number[] = levels.map(
  (level: Level) => level.length
);

const widestLevel: number = _.max(levelStringLengths);

export class Log {

  static info(message: Message) {
    this.log('INFO', message);
  }

  static debug(message: Message) {
    this.log('DEBUG', message);
  }

  static log(level: Level, message: Message) {
    // If implement log-level setting, only evaluate function and timestamp if need to.
    const now = new Date();
    const messageString: string = (typeof message === 'function') ? message() : message;
    console.log(`${now.toISOString()} ${level.padStart(widestLevel)} ${messageString}`)
  }

}


