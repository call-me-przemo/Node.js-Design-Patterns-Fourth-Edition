import { equal } from "node:assert/strict";
import { suite, test } from "node:test";
import { DbClient, setupDb } from "./database";
import { PizzaTracker } from "./pizza-tracker";

suite("PizzaTracker class", { concurrency: true }, () => {
  test("handle orders correctly", async () => {
    const db = new DbClient(":memory:");
    const pizzaTracker = new PizzaTracker(db);

    await setupDb(db);

    await pizzaTracker.placeOrder("order1", "Danny", "Peperoni");
    await pizzaTracker.placeOrder("order2", "Lisa", "Capricciosa");
    await pizzaTracker.placeOrder("order3", "Jack", "Diavolo");
    await pizzaTracker.updateEta("order1", 25);
    await pizzaTracker.markAsDelivered("order2");

    const orders = await pizzaTracker.getOrders();

    await db.close();

    equal(orders.length, 3);
    equal(orders.find(({ id }) => id === "order1")?.eta, 25);
    equal(orders.find(({ id }) => id === "order2")?.status, "delivered");
  });
});
