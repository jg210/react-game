// @flow

import _ from 'lodash';

type Message = string | () => string;

type Level = 'INFO' | 'DEBUG';

const levels: Level[] = ['INFO', 'DEBUG'];

const widestLevel: number = _.max(levels.map((level: Level) => level.length));

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


