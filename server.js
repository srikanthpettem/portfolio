const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();

// Serve your static SPA folder
const staticFolder = path.join(__dirname, "portfolio");
app.use(express.static(staticFolder));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(staticFolder, "index.html"));
});

// HTTPS setup
const certDir = path.join(__dirname, "ssl");
const keyPath = path.join(certDir, "localhost-key.pem");
const certPath = path.join(certDir, "localhost.pem");

let options;

try {
  options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };
} catch (err) {
  console.warn("SSL files not found, generating self-signed certs for localhost");
  const selfsigned = require("selfsigned");
  const attrs = [{ name: "commonName", value: "localhost" }];
  const pems = selfsigned.generate(attrs, { days: 365 });
  options = { key: pems.private, cert: pems.cert };
}

// Start HTTPS server
const PORT = 3333;
https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS Server running at https://localhost:${PORT}`);
});
