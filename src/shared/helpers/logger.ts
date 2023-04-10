class Logger {
  log(msg: string, data?: any) {
    console.log('%c' + msg, 'color: green');
    console.log(data);
  }

  error(msg: string) {
    console.error('%c' + msg, 'color red');
  }
}

export const logger = new Logger();
