export function createSendToServerMiddleware(address: URL) {
  return async (message: unknown) => {
    await fetch(address, { method: "POST", body: message as string });

    return message;
  };
}
