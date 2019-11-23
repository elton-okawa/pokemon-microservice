import { Container } from 'typedi';

import { Command } from './command';
import { Constants } from './contants';

const LOGOUT_COMMAND = 'logout';

export class LogoutCommand extends Command {

  constructor() {
    super(LOGOUT_COMMAND);
  }

  do(args: any[]) {
    if (!Container.get(Constants[Constants.TOKEN])) {
      return 'Not logged in'
    }

    Container.set(Constants[Constants.TOKEN], '');
    return 'Successful logged out';
  }  
  
  getUsage(): string {
    return `${LOGOUT_COMMAND}`;
  }
}