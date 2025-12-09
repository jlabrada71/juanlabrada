// how to test
// curl -H Accept:text/event-stream http://localhost:3000/random
// curl -H Accept:text/event-stream http://localhost:3000/clients
// sends random numbers at random intervals
// list the number of current clients


import  express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/clients', (request, response) => response.json({clients: clients.length}));
app.get('/random', randomHandler);
app.get('/latest', latestHandler);
app.post('/fact', addFact);

const PORT = 3000;

let clients = [];
let facts = [];

app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`)
})


function randomHandler(request, response, next) {
    sseStart(response);
  
    sseRandom(response);
  
    const clientId = Date.now();
  
    const newClient = {
      id: clientId,
      response
    };
  
    clients.push(newClient);
  
    request.on('close', () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter(client => client.id !== clientId);
    });
  }
  
  function latestHandler(request, response, next) {
    sseStart(response);
  
    sseLatest(response);
  
  }


// SSE head
function sseStart(res) {
    res.writeHead(200, {
      'Content-Type': "text/event-stream",
      'Cache-Control': "no-cache",
      Connection: "keep-alive"
    });
  }

  // SSE random number
function sseRandom(res) {
    res.write("data: " + (Math.floor(Math.random() * 1000) + 1) + "\n\n");
    setTimeout(() => sseRandom(res), Math.random() * 3000);
  }


    // SSE random number
function sseLatest(res) {
  res.write("event: news\n");
  res.write("data: SSE is great!\n\n");
  res.write("event: weather\n");
  res.write('data: { "temperature": "20C", "wind": "10Kph", "rain": "25%" }\n\n');
  res.write("event: stock\n");
  res.write('data: { "symbol": "AC", "company": "Acme Corp", "price": 123.45, "increase": -1.1 }\n\n');

  setTimeout(() => sseLatest(res), Math.random() * 3000);
}


  function sendEventsToAll(newFact) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(newFact)}\n\n`))
  }
  
  async function addFact(request, respsonse, next) {
    const newFact = request.body;
    facts.push(newFact);
    respsonse.json(newFact)
    return sendEventsToAll(newFact);
  }
  