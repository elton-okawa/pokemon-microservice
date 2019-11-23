export abstract class Command {
  command: string;

  constructor(command: string) {
    this.command = command;
  }

  exec(args: any[]): any {
    if (args[0] !== this.command) {
      return;
    }

    return this.do(args);
  }

  abstract do(args: any[]): any;
  abstract getUsage(): string;
}