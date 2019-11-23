import express from 'express';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

const app = express();
app.use(express.json());
const port = 3002

// The second argument is used to tell the DB to save after each push
// If you put false, you'll have to call the save() method.
// The third argument is to ask JsonDB to save the database in an human readable format. (default false)
// The last argument is the separator. By default it's slash (/)
const db = new JsonDB(new Config("data", true, false, '/'));

interface TrainerDb {
  name: string;
  pokemons: number[];
}

app.get('/', (req, res) => {
  res.send('Pokemon microservice');
});

app.get('/trainer/:id', (req: any, res) => {
  const { tokenPayload } = req.body;
  console.log(tokenPayload);
  const data: TrainerDb = db.getData(`/trainer/${tokenPayload.id}`);
  data.pokemons = data.pokemons.map(pokemonId => db.getData(`/pokemon/${pokemonId}`));

  res.send(data);
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
