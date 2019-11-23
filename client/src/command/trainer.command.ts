import Container, { Service } from "typedi";

import { HttpClient } from "src/request";
import { Command } from "./command";
import { Constants } from "./contants";

const TRAINER_COMMAND = 'trainer';

@Service()
export class TrainerCommand extends Command {

  constructor(
    private readonly httpClient: HttpClient,
  ) {
    super(TRAINER_COMMAND);
  }

  async do(args: any[]) {
    try {
      const token = Container.get(Constants[Constants.TOKEN]);
      console.log(`token: ${token}`);
      const res = await this.httpClient.get(`/trainer`, { Authorization: token });
      return res.data;
    } catch (error) {
      if (error.response) {
        return `[Status: ${error.response.status}] ${error.response.data}`;
      } else {
        return error.message;
      }
    }
  }

  getUsage(): string {
    return `${TRAINER_COMMAND}`;
  }
}