import express from 'express';
import { login, verify } from '../controller/userController';

const router = express.Router();

router.post('/login', login);
router.post('/verify', verify);

export default router;