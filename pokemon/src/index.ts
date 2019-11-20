import express from 'express';
import * as jwt from 'jsonwebtoken';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

const app = express();
const port = 3000

// The second argument is used to tell the DB to save after each push
// If you put false, you'll have to call the save() method.
// The third argument is to ask JsonDB to save the database in an human readable format. (default false)
// The last argument is the separator. By default it's slash (/)
const db = new JsonDB(new Config("data", true, false, '/'));

interface TrainerDb {
  name: string;
  pokemons: number[];
}


app.get('/trainer/:id', (req: any, res) => {
  req.headers.token ? '' : res.status(401).send('Acesso Negado');

  const payload: any = jwt.verify(req.headers.token, 'secret');
  if (payload.trainerId === req.params.id) {
    const data: TrainerDb = db.getData(`/trainer/${payload.trainerId}`);
    data.pokemons = data.pokemons.map(pokemonId => db.getData(`pokemon/${pokemonId}`));

    res.send(data);
  } else {
    res.status(401).send('Acesso negado'); 
  }
});

app.get('/pokemon/:id', (req, res) => {
  const pokemon = db.getData(`/pokemon/${req.params.id}`);
  if (pokemon) {
    res.send(pokemon);
  } else {
    res.status(404).send('Id inválido');
  }
});

app.listen(port, () => console.log(`Pokemon listening on port ${port}!`))
