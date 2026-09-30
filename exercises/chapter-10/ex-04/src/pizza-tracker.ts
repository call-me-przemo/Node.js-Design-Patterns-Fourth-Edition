import { DbClient } from "./database";

export class PizzaTracker {
  constructor(private readonly db: DbClient) {}

  public async placeOrder(id: string, customerName: string, pizzaType: string) {
    await this.db.query(
      "INSERT INTO orders (id, customerName, pizzaType, status) VALUES (?, ?, ?, ?)",
      [id, customerName, pizzaType, "pending"],
    );
  }

  public async getOrders(): Promise<Array<Order>> {
    return this.db.query("SELECT * FROM orders");
  }

  public async markAsDelivered(id: string) {
    await this.db.query("UPDATE orders SET status = ? WHERE id = ?", [
      "delivered",
      id,
    ]);
  }

  public async updateEta(id: string, eta: number) {
    await this.db.query("UPDATE orders SET eta = ? WHERE id = ?", [eta, id]);
  }
}

interface Order {
  id: string;
  customerName: string;
  pizzaType: string;
  status: "pending" | "delivered";
  eta: number;
}
