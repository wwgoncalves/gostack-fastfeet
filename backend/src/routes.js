import { Router } from 'express';

const routes = new Router();

routes.get('/test', (request, response) => {
  const { name } = request.query;

  response.status(200).json({ message: `hi ${name}` });
});

export default routes;
