
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>TikTok LIVE Animation</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#090914;color:white;font-family:Arial,sans-serif}
.scene{width:100%;min-height:100vh;display:flex;flex-direction:column;
align-items:center;justify-content:center;overflow:hidden;position:relative;
background:radial-gradient(circle at 50% 35%,#34205b,#090914 65%)}
h1{font-size:30px;text-align:center}
.subtitle{color:#c5b5e9}
.machine{margin-top:25px;width:250px;border:3px solid #b9a3ff;
border-radius:25px;padding:20px;background:#171526;text-align:center;
box-shadow:0 0 35px #7952db66}
.slot{height:8px;background:#a995ff;border-radius:8px;margin:20px 0}
.label{width:180px;min-height:100px;margin:auto;background:white;color:#171526;
border-radius:8px;display:flex;flex-direction:column;align-items:center;
justify-content:center;gap:8px;padding:12px;animation:appear 1s infinite alternate}
.avatar{width:45px;height:45px;border-radius:50%;background:#bca8ff;
display:grid;place-items:center;font-size:23px}
@keyframes appear{from{transform:translateY(-3px)}
to{transform:translateY(5px)}}
.counter{margin-top:25px;padding:12px 22px;border:1px solid #8c70db;
border-radius:30px;background:#19152b}
.note{position:absolute;bottom:18px;color:#aaa;text-align:center;font-size:12px}
</style>
</head>
<body>
<main class="scene">
<h1>LA STAMPANTE DEI REGALI</h1>
<div class="subtitle">Invia un regalo e lascia il tuo segno</div>
<div class="machine">
<div>VIRTUAL LABEL PRINTER</div>
<div class="slot"></div>
<div class="label">
<div class="avatar">★</div>
<strong>IL TUO NOME</strong>
<span>Grazie per il supporto!</span>
</div>
</div>
<div class="counter">Etichette stampate: <strong id="count">0</strong></div>
<div class="note">ANIMAZIONE DIMOSTRATIVA · EVENTI LIVE NON ANCORA COLLEGATI</div>
</main>
</body>
</html>`);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server avviato sulla porta " + PORT);
});
