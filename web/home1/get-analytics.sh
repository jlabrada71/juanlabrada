node run-process.js ./processes/analytics/delete-old-analytics.js
curl https://www.juanlabrada.com/api/v1/analytics  >analytics.json
node show-analytics.js
code analytics.json
