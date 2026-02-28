export function createTimestampedConsole(console: Console) {
  return new Proxy(console, {
    get(target, property: PropertyType, _reciver) {
      const now = new Date();

      return (message: string) => {
        target[property](`${now.toISOString()} ${message}`);
      };
    },
  });
}

type PropertyType = "debug" | "info" | "log" | "warn" | "error";
