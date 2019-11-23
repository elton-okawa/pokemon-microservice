import Container, { Service, Inject } from 'typedi';

import { HttpClient } from 'src/request';
import { Command } from "./command";
import { Constants } from './contants';

const LOGIN_COMMAND = 'login';

@Service()
export class LoginCommand extends Command {

  constructor(
    private readonly httpClient: HttpClient,
  ) {
    super(LOGIN_COMMAND);
  }

  async do(args: any[]): Promise<any> {
    if (Container.get(Constants[Constants.TOKEN])) {
      return 'Already logged in';
    }

    const [_, username, password] = args;
    if (!username || !password) {
      return 'Invalid username or password';
    }

    try {
      const res = await this.httpClient.post('/login', { username, password });
      Container.set(Constants[Constants.TOKEN], res.data.token);
      return res.data.message;
    } catch(error) {
      if (error.response) {
        return `[Status: ${error.response.status}] ${error.response.data}`;
      } else {
        return error.message;
      }
    }
  }

  getUsage(): string {
    return 'login <username> <password>';
  }
}