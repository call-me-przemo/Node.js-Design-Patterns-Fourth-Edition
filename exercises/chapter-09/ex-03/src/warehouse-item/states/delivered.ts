import { ItemState } from "./types";

export class DeliveredState implements ItemState {
  constructor(private address: string) {}

  public getStateMessage(id: string) {
    return `Item ${id} was delivered to ${this.address}`;
  }
}
