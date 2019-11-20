import express from 'express';
import * as jwt from 'jsonwebtoken';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

const app = express();
app.use(express.json());
const port = 3001

// The second argument is used to tell the DB to save after each push
// If you put false, you'll have to call the save() method.
// The third argument is to ask JsonDB to save the database in an human readable format. (default false)
// The last argument is the separator. By default it's slash (/)
const db = new JsonDB(new Config("data", true, false, '/'));

interface UserDb {
  id: number;
  login: string;
  password: string;
}


app.post('/login', (req: any, res) => {
  const validInput = req.body && req.body.login && req.body.password;
  if (!validInput) {
    return res.status(401).send('Credenciais inválidas');
  }

  const data = db.find<UserDb>('/user', (user: UserDb) => user.login === req.body.login);
  
  if (!data || data.password !== req.body.password) {
    return res.status(401).send('Login ou password inválido');
  } else {
    const token = jwt.sign({ id: data.id }, 'secret');
    return res.send({ message: 'Login feito com sucesso', token });
  }
});

app.listen(port, () => console.log(`Auth listening on port ${port}!`))
