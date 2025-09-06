const express = require("express");
const app = express();

app.get("/health", (req, res) => {
  res.json({ status: "OK", time: new Date().toISOString() });
});

const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Mini server running at http://localhost:${PORT}/health`);
});
//{"status":"OK","time":"2025-09-06T10:04:02.425Z"}
//Invoke-RestMethod -Uri "http://localhost:5000/api/ai/price-suggest" -Method POST -Body (@{ category="Electronics"; title="iPhone 13" } | ConvertTo-Json) -ContentType "application/json"
// try {
//     Invoke-RestMethod -Uri "http://localhost:5000/health"
// } catch {
//     Write-Host "Failed: $($_.Exception.Message)"
// }
//  