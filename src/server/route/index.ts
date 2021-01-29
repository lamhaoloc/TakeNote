import express from 'express';

import auth from '../handlers/auth';

import authRouter from './auth';

const router = express.Router();

router.use('/auth', authRouter);

export default router;
