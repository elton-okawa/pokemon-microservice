import { Command } from "./command";

const EXIT_COMMAND = 'exit';

export class ExitCommand extends Command {

  constructor() {
    super(EXIT_COMMAND);
  }

  do(args: any[]) {
    process.exit(0);
  }  
  
  getUsage(): string {
    return 'exit' 
  }
}