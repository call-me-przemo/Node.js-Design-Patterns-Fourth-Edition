import { randomUUID } from "node:crypto";
import { ArrivingState, WarehouseItem } from "./warehouse-item";

const warehouseItem = new WarehouseItem(randomUUID(), new ArrivingState());

console.log(warehouseItem.describe());
warehouseItem.store("Sample location id");
console.log(warehouseItem.describe());
warehouseItem.deliver("Sample city");
console.log(warehouseItem.describe());
