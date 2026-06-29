import { ItemState } from "./types";

export class ArrivingState implements ItemState {
  public getStateMessage(id: string) {
    return `Item ${id} is on its way to the warehouse`;
  }
}
