import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import morgan from 'morgan';

import es6 from './routes/es6';
import api from './routes/api';

const app = express();
const upload = multer();

app.use(express.static(__dirname + "/../public/"));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/es6', es6);
app.use('/api', api);

app.get('/hello', (req, res) => {
  res.send('world');
});
app.get('/add/:x/:y', (req, res) => {
  const x = req.params.x * 1;
  const y = req.params.y * 1;
  res.send({sum: x + y});
});

app.listen(3000, () => {
  console.log('server is listening');
});
