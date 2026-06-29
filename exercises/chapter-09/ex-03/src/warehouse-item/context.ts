import {
  ArrivingState,
  DeliveredState,
  ItemState,
  StoredState,
} from "./states";

export class WarehouseItem {
  constructor(
    private id: string,
    private state: ItemState,
  ) {}

  public store(locationId: string) {
    if (this.state instanceof ArrivingState) {
      this.state = new StoredState(locationId);
      return;
    }

    throw new Error("An item can be stored only after it arrives");
  }

  public deliver(address: string) {
    if (this.state instanceof StoredState) {
      this.state = new DeliveredState(address);
      return;
    }

    throw new Error("An item can be delivered only after it has been stored");
  }

  public describe() {
    return this.state.getStateMessage(this.id);
  }
}
