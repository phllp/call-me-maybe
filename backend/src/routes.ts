import express from 'express';

const routes = express.Router();
routes.use(express.json());

routes.get('/health', (req, res) => {
  res.status(200).send('OK');
});

export default routes;
