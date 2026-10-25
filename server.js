
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="it">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>TikTok Live Bot</title>
      <style>
        body {
          margin: 0;
          background: #101014;
          color: white;
          font-family: Arial, sans-serif;
          display: grid;
          place-items: center;
          min-height: 100vh;
          text-align: center;
        }
        .card {
          padding: 32px;
          border: 1px solid #444;
          border-radius: 18px;
          background: #1b1b22;
        }
        .status { color: #6ee7a8; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>TikTok LIVE Bot</h1>
        <p class="status">Server online</p>
        <p>Prototipo in preparazione</p>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});
