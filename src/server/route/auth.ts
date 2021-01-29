import express from 'express';

import auth from '../handlers/auth';
import authHandler from '../handlers/auth';

const router = express.Router();

router.get('/login', authHandler.login);

export default router;
