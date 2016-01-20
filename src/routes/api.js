import express from 'express';
const route = express.Router();

route.use((req, res, next) => {
  console.log("time access API: ", Date.now());
  next();
});
route.get('/', (req, res) => {
  res.send('GET list all ');

});
route.get('/:id', (req, res) => {
  res.send('GET list '+ req.params.id);
});

export default route;
