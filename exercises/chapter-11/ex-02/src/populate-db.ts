import { Level } from "level";
import { nanoid } from "nanoid";
import { Transaction } from "./types";

const products = ["book", "game", "app", "song", "movie"];
const db = new Level<string, Transaction>("sales", { valueEncoding: "json" });

async function populate() {
  for (let i = 0; i < 100000; i++) {
    await db.put(nanoid(), {
      amount: Math.ceil(Math.random() * 100),
      product: products[Math.floor(Math.random() * products.length)],
    });
  }

  console.log("DB populated");
}

populate();
