import { ItemState } from "./types";

export class StoredState implements ItemState {
  constructor(private locationId: string) {}

  public getStateMessage(id: string) {
    return `Item ${id} is stored in location ${this.locationId}`;
  }
}
