curl https://www.juanlabrada.com/api/v1/test
curl https://www.juanlabrada.com/api/v1/heartbeat
curl https://www.juanlabrada.com/api/v1/analytics  >analytics.json
curl https://www.juanlabrada.com/api/v1/config  >config.json
curl https://www.juanlabrada.com/api/v1/messages

curl http://localhost:3000/api/v1/messages
curl http://localhost:3000/api/v1/heartbeat
curl -d '{"rating":"5"}' -H "Content-Type: application/json" -X POST http://localhost:3100/api/v1/notes/id/rating
curl -d '{"question":{"question": "What might help look like?", "description": "This is a sample description", "image": "this is an image url"}}' -H "Content-Type: application/json" -X POST http://localhost:3100/api/v1/questions

// remove authorization first, reset after
serverMiddleware/api/analytics/routes/analytics.js
curl -d '{"analytics":{"key1":"value1", "key2":"value2"}}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/v1/analytics
curl http://localhost:3000/api/v1/analytics
curl https://juanlabrada.com/api/v1/analytics

http://localhost:3100/api/v1/files
http://localhost:3100/api/v1/files/form
curl http://localhost:3100/api/v1/files/firebase >files.txt