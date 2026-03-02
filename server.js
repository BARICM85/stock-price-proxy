import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// 🔥 Enable CORS for all origins (safe for this public API)
app.use(cors());

app.get("/price/:symbol", async (req, res) => {
  const symbol = req.params.symbol;

  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`,
      {
        headers: { "User-Agent": "Mozilla/5.0" }
      }
    );

    const data = await response.json();

    if (!data.chart || !data.chart.result) {
      return res.status(404).json({ error: "Symbol not found" });
    }

    const price = data.chart.result[0].meta.regularMarketPrice;

    res.json({ price });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch price" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running"));
