import { createServer } from "node:http";
// import { totalSales } from "./total-sales";
// import { totalSalesBatch as totalSales } from "./total-sales";
import { totalSalesCache as totalSales } from "./total-sales";

createServer((req, res) => {
  const url = new URL(req.url!, "http://localhost");
  const product = url.searchParams.get("product");
  console.log(`Processing query: ${url.search}`);

  totalSales(product, (err, sum) => {
    if (err) {
      return res.writeHead(500).end(err.message);
    }

    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(
      JSON.stringify({
        product,
        sum,
      }),
    );
  });
}).listen(8001, () => console.log("Server started"));
