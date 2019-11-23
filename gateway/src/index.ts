import express from 'express';
import httpProxy from 'express-http-proxy';
import * as jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
const port = 3000

const baseUrl = 'http://localhost';
const pokemonPort = 3002;
const authPort = 3001;

const pokemonProxy = httpProxy(`${baseUrl}:${pokemonPort}`, { proxyReqBodyDecorator: (body, srcReq) => {
  const tokenPayload = verifyAuth(srcReq.headers.authorization || '');
  return { ...body, tokenPayload };
}});

const authServiceProxy = httpProxy(`${baseUrl}:${authPort}`);


app.get('/', (req, res) => {
  res.send('Gateway microservice');
});

app.post('/login', (req, res, next) => {
  authServiceProxy(req, res, next);
});

app.get('/pokemon/:id', (req, res, next) => {
  pokemonProxy(req, res, next);
});

app.get('/trainer', (req, res, next) => {
  pokemonProxy(req, res, next);
});


function verifyAuth(token: string) {
  if (token) {
    return jwt.verify(token, 'secret');
  } else {
    throw new Error('Token inválida');
  }
}

app.listen(port, () => console.log(`Gateway listening on port ${port}!`))
