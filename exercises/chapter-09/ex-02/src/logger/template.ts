export abstract class LoggerTemplate {
  public abstract log(msg: string): Promise<void>;
  public abstract debug(msg: string): Promise<void>;
  public abstract info(msg: string): Promise<void>;
  public abstract warn(msg: string): Promise<void>;
  public abstract error(msg: string): Promise<void>;
}
