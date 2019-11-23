import Container, { Service } from "typedi";

import { HttpClient } from "src/request";
import { Command } from "./command";
import { Constants } from "./contants";

const POKEMON_COMMAND = 'pokemon';

@Service()
export class PokemonCommand extends Command {

  constructor(
    private readonly httpClient: HttpClient,
  ) {
    super(POKEMON_COMMAND);
  }

  async do(args: any[]) {
    const id = args[1];
    if (!id) {
      return 'Type an id';
    }

    try {
      const token = Container.get(Constants[Constants.TOKEN]);
      const res = await this.httpClient.get(`/pokemon/${id}`, { Authorization: token });
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
    return `${POKEMON_COMMAND} <id>`;
  }
}