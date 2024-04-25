import express from 'express';

import { ErrorResponseType } from '../types/response';
import usersRouter from './userRouter';

const router = express.Router();

router.get<{}, ErrorResponseType>('/', (req, res) => {
  res.json({
    error: 'What are you doing here ??????',
    code: 404,
  });
});

router.use('/users', usersRouter);

export default router;
