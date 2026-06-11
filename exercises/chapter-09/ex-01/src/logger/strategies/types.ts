export interface LoggingStrategy {
  log: (msg: string) => Promise<void>;
  debug: (msg: string) => Promise<void>;
  info: (msg: string) => Promise<void>;
  warn: (msg: string) => Promise<void>;
  error: (msg: string) => Promise<void>;
}
