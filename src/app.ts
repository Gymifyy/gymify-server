import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './utils/middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';
type ApiHelperResponse = Array<{ path: string, description: string, method: 'GET' | 'POST', usage: string, return: string, payload?: {} }>;

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req: Request, res: Response<MessageResponse>) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.get('/help', (req: Request, res: Response<ApiHelperResponse>) => {
  const result: ApiHelperResponse = [
    {
      path: '/',
      method: 'GET',
      description: 'Display a message with emojis',
      usage: '( GET ) /',
      return: `{ 
      message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
    }`,
      payload: {},
    },
    {
      path: '/api/',
      method: 'GET',
      description: 'Displays a fun message :)',
      usage: '( GET ) /api/',
      return: '',
      payload: {},
    },
    {
      path: '/api/users/help',
      method: 'GET',
      description: 'Display a helper message that contains all the routes and how to access them',
      usage: '( GET ) /api/users/help',
      return: 'Request /api/users/help for more info',
      payload: {},
    },
    {
      path: '/api/users',
      method: 'GET',
      description: 'Get All users',
      usage: '( GET ) /api/users',
      return: 'Request /api/users/help for more info',
      payload: {},
    },
  ];
  res.json(result);
});

// File based routing. Everything inside api folder will be serverd with an api prefix
app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening: http://localhost:${port}`));

export default app;
